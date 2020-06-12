import { ParsedValue, splitSpacesExcludeQuotesDetailed } from 'quoted-string-space-split';
import OptionPrefix from './@types/OptionPrefix';
import MessageOption from './message-option';
import OptionDef from './option-def';

export type ParsedMessage = {
	isCommand: boolean;
	command?: string;
	fullContent?: string;
	content?: string;
	options?: MessageOption[];
	duplicatedOptions?: MessageOption[];
}

export { parseMessage };

export default function parseMessage(message: string, commandPrefix: string, optionPrefix: OptionPrefix, optionsDefinitions?: OptionDef[]): ParsedMessage {
	const extractedData = extractCommandAndContent(message, commandPrefix);
	
	const extractedOptions: ParsedOptions | Record<string, unknown> = extractedData.content ? extractOptionsFromParsedContent(extractedData.content, optionPrefix, optionsDefinitions) : {};
	
	const parsedMessage = {
		fullContent: extractedData.content,
		...extractedData,
		...extractedOptions
	};
	
	return parsedMessage;
}

function extractCommandAndContent(message: string, commandPrefix: string) {
	const isCommand = message.startsWith(commandPrefix);
	
	let command = undefined;
	let content: string | undefined = message;
	
	if (isCommand) {
		const noPrefixMessage = message.slice(commandPrefix.length).trim();
		
		const commandContentSeparator = ' ';
		
		const [first, ...rest] = noPrefixMessage.replace(/\s+/g, ' ').split(commandContentSeparator);
		
		[command, content] = [first, rest.length ? rest.join(commandContentSeparator) : undefined];
	}
	
	return { isCommand, command, content };
}

type ParsedOptions = {
	content: string;
	options: MessageOption[];
	duplicatedOptions: MessageOption[];
}

function extractOptionsFromParsedContent(content: string, optionPrefix: OptionPrefix, optionsDefinitions?: OptionDef[]): ParsedOptions {
	const groups = splitSpacesExcludeQuotesDetailed(content);
	
	const options: MessageOption[] = [];
	const duplicatedOptions: MessageOption[] = [];
	
	const longOptionPrefixLength = 2;
	
	let isOptionParseStopped = false;
	
	function getGroupOptionType(group: ParsedValue, optionPrefix: OptionPrefix, longOptionPrefixLength: number): false | 'long' | 'short' | 'stopper' {
		if (group.type == 'plain') {
			if (group.value == `${optionPrefix}${optionPrefix}`) {
				return 'stopper';
			} else if (group.value.startsWith(optionPrefix.repeat(longOptionPrefixLength))) {
				return 'long';
			} else if (group.value.startsWith(optionPrefix)) {
				return 'short';
			}
		}
		
		return false;
	}
	
	function createMessageOption(option: string, index: number, nextGroup?: ParsedValue): MessageOption {
		let content: string | undefined = undefined;
		
		const definition = optionsDefinitions?.find(optionDef => optionDef.calls.includes(option));
		
		if (nextGroup && (!definition || definition.acceptsContent)) {
			const nextGroupOptionType = getGroupOptionType(nextGroup, optionPrefix, longOptionPrefixLength);
			
			if (!nextGroupOptionType) {
				content = nextGroup.value;
				
				nextGroup.value = '';
			}
		}
		
		return new MessageOption(option, index, content, definition);
	}
	
	function handleOptionCreation(optionName: string, index: number, nextGroup?: ParsedValue) {
		const newOption = createMessageOption(optionName, index, nextGroup);
		
		const isOptionDuplicated = !!options.find(option => option.name == newOption.name);
		
		isOptionDuplicated ? duplicatedOptions.push(newOption) : options.push(newOption);
	}
	
	const extractedContent = groups.reduce((parsedContent, group, index, groups) => {
		if (!group.value) {
			return parsedContent;
		}
		
		if (isOptionParseStopped) {
			return parsedContent.concat(' ', group.value);
		}
		
		const groupOptionType = getGroupOptionType(group, optionPrefix, longOptionPrefixLength);
		
		if (groupOptionType == 'stopper') {
			isOptionParseStopped = true;
			return parsedContent;
		}
		
		if (groupOptionType == 'long') {
			const longOption = group.value.slice(optionPrefix.length * longOptionPrefixLength);
			
			handleOptionCreation(longOption, index, groups[index + 1]);
			
			return parsedContent;
		}
		
		if (groupOptionType == 'short') {
			const shortOptions = group.value.slice(optionPrefix.length).split('');
			
			shortOptions.forEach((shortOption, shortOptionIndex, array) => {
				// Only allow dealing with next group on last short option
				const nextGroup = shortOptionIndex == array.length - 1 ? groups[index + 1] : undefined;
				
				handleOptionCreation(shortOption, index, nextGroup);
			});
			
			return parsedContent;
		}
		
		return parsedContent.concat(' ', group.value);
	}, '').trim();
	
	return {
		content: extractedContent,
		options: options,
		duplicatedOptions: duplicatedOptions
	};
}
