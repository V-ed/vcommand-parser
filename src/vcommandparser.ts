import OptionPrefix from './@types/OptionPrefix';
import MessageOption from './message-option';
import { extractOptionsFromParsedContent, ParsedMessage, parseMessage } from './message-parser';
import OptionDef from './option-def';

export { VCommandParser };

export default class VCommandParser {
	static readonly DEFAULT_COMMAND_PREFIX = '!';
	static readonly DEFAULT_OPTION_PREFIX = '-';
	
	/**
	 * This function parses a string and gets the component if the string is in the format `{PREFIX}{COMMAND} [{content}] [{OPTION_PREFIX}{OPTION} [{OPTION_CONTENT}]]` (where anything between `[]` is optional).
	 *
	 * This function lazily parses the message, meaning only the command is processed.
	 * To process options, you can either use the `parsed.doParseOptions()` function or set the option definitions using `parsed.setOptionDefinitions(definitions)`.
	 *
	 * @param message String that potentially contains a command.
	 *
	 * @param commandPrefix String that will be used for the `{PREFIX}` variable, in the format given above.
	 *
	 * Defaults to `VCommandParser.DEFAULT_COMMAND_PREFIX` (`!`).
	 *
	 * @param optionPrefix String that will be used for the `{OPTION_PREFIX}` variable, in the format given above.
	 * Needs to be part of the `OptionPrefix` type.
	 *
	 * Defaults to `VCommandParser.DEFAULT_OPTION_PREFIX` (`-`).
	 *
	 * @returns `VLazyParsedCommand` instance containing the results of the parsing.
	 */
	static parseLazy(message: string, commandPrefix = VCommandParser.DEFAULT_COMMAND_PREFIX, optionPrefix: OptionPrefix = VCommandParser.DEFAULT_OPTION_PREFIX): VLazyParsedCommand {
		const parsedMessage = parseMessage(message, commandPrefix, optionPrefix, undefined, true);
		
		return new VLazyParsedCommand(message, commandPrefix, optionPrefix, parsedMessage);
	}
	
	/**
	 * This function parses a string and gets the component if the string is in the format `{PREFIX}{COMMAND} [{content}] [{OPTION_PREFIX}{OPTION} [{OPTION_CONTENT}]]` (where anything between `[]` is optional).
	 *
	 * If you didn't use the `optionDefinitions` param, you can set the option definitions afterward using `parsed.setOptionDefinitions(definitions)`.
	 *
	 * @param message String that potentially contains a command.
	 *
	 * @param commandPrefix String that will be used for the `{PREFIX}` variable, in the format given above.
	 *
	 * Defaults to `VCommandParser.DEFAULT_COMMAND_PREFIX` (`!`).
	 *
	 * @param optionPrefix String that will be used for the `{OPTION_PREFIX}` variable, in the format given above.
	 * Needs to be part of the `OptionPrefix` type.
	 *
	 * Defaults to `VCommandParser.DEFAULT_OPTION_PREFIX` (`-`).
	 *
	 * @param optionDefinitions Array of option definitions that tells the parser how to map options and tweak some behaviors, such as if the option accepts content.
	 *
	 * @returns `VParsedCommand` instance containing the results of the parsing.
	 */
	static parse(message: string, commandPrefix = VCommandParser.DEFAULT_COMMAND_PREFIX, optionPrefix: OptionPrefix = VCommandParser.DEFAULT_OPTION_PREFIX, optionDefinitions?: OptionDef[]): VParsedCommand {
		const parsedMessage = parseMessage(message, commandPrefix, optionPrefix, optionDefinitions);
		
		return new VParsedCommand(message, commandPrefix, optionPrefix, parsedMessage, optionDefinitions);
	}
}

export class VParsedCommand {
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
	
	constructor(message: string, commandPrefix = VCommandParser.DEFAULT_COMMAND_PREFIX, optionPrefix: OptionPrefix = VCommandParser.DEFAULT_OPTION_PREFIX, parsedMessage: ParsedMessage, optionDefinitions?: OptionDef[]) {
		this.message = message;
		this.commandPrefix = commandPrefix;
		this.optionPrefix = optionPrefix;
		this.optionDefinitions = optionDefinitions;
		
		({
			isCommand: this.isCommand,
			command: this.command,
			content: this.content,
			options: this.options,
			duplicatedOptions: this.duplicatedOptions,
			fullContent: this.fullContent
		} = parsedMessage);
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

export class VLazyParsedCommand extends VParsedCommand {
	constructor(message: string, commandPrefix = VCommandParser.DEFAULT_COMMAND_PREFIX, optionPrefix: OptionPrefix = VCommandParser.DEFAULT_OPTION_PREFIX, parsedMessage: ParsedMessage, optionDefinitions?: OptionDef[]) {
		super(message, commandPrefix, optionPrefix, parsedMessage, optionDefinitions);
	}
	
	/**
	 * This function parses the full message to extract the options from the content of the message.
	 *
	 * This has no value if you called the `setOptionDefinitions` function before.
	 */
	doParseOptions(): void {
		this.doExtractOptions();
	}
}
