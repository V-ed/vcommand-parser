import OptionPrefix from './@types/OptionPrefix';
import MessageOption from './message-option';
import { extractOptionsFromParsedContent, VParsedMessage } from './message-parser';
import OptionDef from './option-def';
import { RequiredParserOptions, VLazyParserOptions, VParserOptions } from './vcommandparser';

export class VCommonParsedCommand {
	readonly isCommand: boolean;
	
	readonly message: string;
	
	readonly command?: string;
	readonly content?: string;
	
	readonly commandPrefix: string;
	readonly optionPrefix: OptionPrefix;
	
	readonly optionDefinitions?: OptionDef[];
	
	readonly options?: MessageOption[];
	readonly duplicatedOptions?: MessageOption[];
	readonly fullContent?: string;
	
	constructor(message: string, parsedMessage: VParsedMessage<RequiredParserOptions<VLazyParserOptions | VParserOptions>>) {
		this.message = message;
		
		({
			isCommand: this.isCommand,
			command: this.command,
			content: this.content,
			options: this.options,
			duplicatedOptions: this.duplicatedOptions,
			fullContent: this.fullContent,
			parserOptions: {
				commandPrefix: this.commandPrefix,
				optionPrefix: this.optionPrefix,
			},
		} = parsedMessage);
		
		if (typeof parsedMessage.parserOptions.optionDefinitions != 'function') {
			this.optionDefinitions = parsedMessage.parserOptions.optionDefinitions;
		}
	}
	
	/**
	 * Retrieves an option from the list of options.
	 *
	 * @param call The name of the option / one of its aliases to use for the search method.
	 *
	 * If the option has a definition, this definition will be used to try and match the given call with the defined calls, otherwise, it will check if the option name matches the given call.
	 *
	 * If no option has such call, `undefined` is returned.
	 */
	getOption(call: string): MessageOption | undefined;
	
	/**
	 * Retrieves an option from the list of options.
	 *
	 * @param position The position that the option is in.
	 *
	 * If no option is in that position, `undefined` is returned.
	 */
	getOption(position: number): MessageOption | undefined;
	
	getOption(search: string | number): MessageOption | undefined {
		return this.options?.find(option => {
			if (typeof search == 'string') {
				return option.definition?.calls.includes(search) || option.name == search;
			} else {
				return option.position == search;
			}
		});
	}
	
	/**
	 * Sets the option definitions, even if the message has already been parsed, and updates the properties to reflect the given definitions.
	 *
	 * @param optionDefinitions Array of option definitions that tells the parser how to map options and tweak some behaviors, such as if the option accepts content.
	 */
	setOptionDefinitions(optionDefinitions: OptionDef[]): void {
		this.doExtractOptions(optionDefinitions);
	}
	
	protected doExtractOptions(optionDefinitions?: OptionDef[]): void {
		// If there was already no content, there will surely not be any options in it
		if (this.fullContent) {
			const parsedOptions = extractOptionsFromParsedContent(this.fullContent, this.optionPrefix, optionDefinitions);
			
			({
				content: (this.content as string | undefined),
				options: (this.options as MessageOption[] | undefined),
				duplicatedOptions: (this.duplicatedOptions as MessageOption[] | undefined),
			} = parsedOptions);
		}
	}
}

export class VParsedCommand extends VCommonParsedCommand {
	constructor(message: string, parsedMessage: VParsedMessage<RequiredParserOptions<VParserOptions>>) {
		super(message, parsedMessage);
	}
}

export class VLazyParsedCommand extends VCommonParsedCommand {
	private readonly optionDefinitionsGetter?: (parsedCommand: this) => OptionDef[];
	
	constructor(message: string, parsedMessage: VParsedMessage<RequiredParserOptions<VLazyParserOptions>>) {
		super(message, parsedMessage);
		
		if (typeof parsedMessage.parserOptions.optionDefinitions == 'function') {
			this.optionDefinitionsGetter = parsedMessage.parserOptions.optionDefinitions;
		}
	}
	
	/**
	 * This function parses the full message to extract the options from the content of the message.
	 *
	 * This has no value if you called the `setOptionDefinitions` function before.
	 */
	doParseOptions(): void {
		this.doExtractOptions(this.optionDefinitions ?? (this.optionDefinitionsGetter && this.optionDefinitionsGetter(this)));
	}
}

export default VLazyParsedCommand;
