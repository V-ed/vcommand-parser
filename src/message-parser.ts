import { ParsedValue, splitSpacesExcludeQuotesDetailed } from 'quoted-string-space-split';
import OptionPrefix from './@types/OptionPrefix';
import MessageOption from './message-option';
import OptionDef from './option-def';
import { RequiredParserOptions, verifyParserOptionsIsNonLazy, VLazyParserOptions, VParserOptions } from './vcommandparser';

export type VParsedMessage<T extends VLazyParserOptions | VParserOptions> = {
	isCommand: boolean;
	parserOptions: T;
	command?: string;
	fullContent?: string;
	content?: string;
	options?: MessageOption[];
	duplicatedOptions?: MessageOption[];
}

export function doParseMessage(message: string, parserOptions: RequiredParserOptions<VLazyParserOptions | VParserOptions>): VParsedMessage<RequiredParserOptions<VLazyParserOptions | VParserOptions>> {
	const extractedData = extractCommandAndContent(message, parserOptions.commandPrefix);
	
	const extractedOptions: ParsedOptions | Record<string, unknown> = verifyParserOptionsIsNonLazy(parserOptions) && extractedData.isCommand && extractedData.content
		? extractOptionsFromParsedContent(extractedData.content, parserOptions.optionPrefix, parserOptions.optionDefinitions)
		: {};
	
	const parsedMessage = {
		fullContent: extractedData.content,
		parserOptions: parserOptions,
		...extractedData,
		...extractedOptions,
	};
	
	return parsedMessage;
}

function extractCommandAndContent(message: string, commandPrefix: string) {
	let isCommand = message.startsWith(commandPrefix);
	
	let command: string | undefined = undefined;
	let content: string | undefined = message;
	
	if (isCommand) {
		const noPrefixMessage = message.slice(commandPrefix.length).trimEnd();
		
		const commandContentSeparator = ' ';
		
		const [first, ...rest] = noPrefixMessage.replace(/\s+/g, ' ').split(commandContentSeparator);
		
		if (!(first?.length)) {
			isCommand = false;
			command = undefined;
			content = message;
		} else {
			[command, content] = [first, rest.length ? rest.join(commandContentSeparator) : undefined];
		}
	}
	
	return { isCommand, command, content };
}

export type ParsedOptions = {
	content?: string;
	options?: MessageOption[];
	duplicatedOptions?: MessageOption[];
}

export function extractOptionsFromParsedContent(content: string, optionPrefix: OptionPrefix, optionDefinitions?: OptionDef[]): ParsedOptions {
	const groups = splitSpacesExcludeQuotesDetailed(content);
	
	const options: MessageOption[] = [];
	const duplicatedOptions: MessageOption[] = [];
	
	const longOptionPrefixLength = 2;
	
	function getGroupOptionType(group: ParsedValue, optionPrefix: OptionPrefix, longOptionPrefixLength: number): false | 'long' | 'short' | 'stopper' {
		if (group.type == 'plain') {
			const longOptionPrefix = optionPrefix.repeat(longOptionPrefixLength);
			
			if (group.value == longOptionPrefix) {
				return 'stopper';
			} else if (group.value.startsWith(longOptionPrefix)) {
				return 'long';
			} else if (group.value.startsWith(optionPrefix)) {
				return 'short';
			}
		}
		
		return false;
	}
	
	function createMessageOption(option: string, position: number, nextGroup?: ParsedValue): MessageOption {
		let content: string | undefined = undefined;
		
		const definition = optionDefinitions?.find(optionDef => optionDef.calls.includes(option));
		
		if (nextGroup && (!definition || definition.acceptsContent)) {
			const nextGroupOptionType = getGroupOptionType(nextGroup, optionPrefix, longOptionPrefixLength);
			
			if (!nextGroupOptionType) {
				content = nextGroup.value;
				
				nextGroup.value = '';
			}
		}
		
		return new MessageOption(option, position, content, definition);
	}
	
	function handleOptionCreation(optionName: string, index: number, nextGroup?: ParsedValue) {
		const newOption = createMessageOption(optionName, index, nextGroup);
		
		const isOptionDuplicated = !!options.find(option => option.name == newOption.name);
		
		isOptionDuplicated ? duplicatedOptions.push(newOption) : options.push(newOption);
	}
	
	let optionPosition = 0;
	
	let isOptionParseStopped = false;
	
	const extractedContent = groups.reduce((parsedContent, group, index, groups) => {
		if (!group.value) {
			return parsedContent;
		}
		
		if (isOptionParseStopped) {
			return parsedContent.concat(' ', group.value);
		}
		
		const groupOptionType = getGroupOptionType(group, optionPrefix, longOptionPrefixLength);
		
		if (groupOptionType) {
			if (groupOptionType == 'stopper') {
				isOptionParseStopped = true;
				return parsedContent;
			}
			
			if (groupOptionType == 'long') {
				const longOption = group.value.slice(optionPrefix.length * longOptionPrefixLength);
				
				handleOptionCreation(longOption, optionPosition++, groups[index + 1]);
				
				return parsedContent;
			}
			
			if (groupOptionType == 'short') {
				const shortOptions = group.value.slice(optionPrefix.length).split('');
				
				shortOptions.forEach((shortOption, shortOptionIndex, array) => {
					// Only allow dealing with next group on last short option
					const nextGroup = shortOptionIndex == array.length - 1 ? groups[index + 1] : undefined;
					
					handleOptionCreation(shortOption, optionPosition++, nextGroup);
				});
				
				return parsedContent;
			}
		}
		
		return parsedContent.concat(' ', group.value);
	}, '').trim();
	
	return {
		content: extractedContent || undefined,
		options: options.length ? options : undefined,
		duplicatedOptions: duplicatedOptions.length ? duplicatedOptions : undefined
	};
}

export default doParseMessage;
