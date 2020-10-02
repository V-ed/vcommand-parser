import OptionPrefix from './@types/OptionPrefix';
import { doParseMessage, VParsedMessage } from './message-parser';
import OptionDef from './option-def';
import { VLazyParsedCommand, VParsedCommand } from './vparsedcommand';

export interface VCommonParserOptions {
	/**
	 * String that will be used to split the prefix to the command name.
	 *
	 * Defaults to `VCommandParser.DEFAULT_COMMAND_PREFIX` (`!`).
	 */
	commandPrefix?: string;
	/**
	 * Character that will be used to split the prefix out of option names.
	 *
	 * Defaults to `VCommandParser.DEFAULT_OPTION_PREFIX` (`-`).
	 */
	optionPrefix?: OptionPrefix;
	
	/**
	 * When set to `true`, this option object will be of type `VLazyParserOptions`, otherwise, if left out or set to `false`, the type will be `VParserOptions`.
	 */
	lazy?: boolean;
}

export interface VLazyParserOptions extends VCommonParserOptions {
	lazy?: true;
	
	/**
	 * Array (or function to return the array) of option definitions that tells the parser how to map options and tweak some behaviors, such as if the option accepts content.
	 *
	 * Remember to use the `doParseOptions` method to parse these options!
	 */
	optionDefinitions?: OptionDef[] | ((parsedCommand?: VLazyParsedCommand) => OptionDef[]);
}

export interface VParserOptions extends VCommonParserOptions {
	lazy?: false;
	
	/**
	 * Array of option definitions that tells the parser how to map options and tweak some behaviors, such as if the option accepts content.
	 */
	optionDefinitions?: OptionDef[];
}

export type RequiredParserOptions<T> = Required<VCommonParserOptions> & T;

function mergeWithDefaultParserOptions<T extends VCommonParserOptions>(parserOptions: T = {} as T): RequiredParserOptions<T> {
	const defaultOptions: Required<VCommonParserOptions> = {
		commandPrefix: VCommandParser.DEFAULT_COMMAND_PREFIX,
		optionPrefix: VCommandParser.DEFAULT_OPTION_PREFIX,
		lazy: false,
	};
	
	return {...defaultOptions, ...parserOptions};
}

/**
 * Verifies if the given `parserOptions` contains values that are of not considered as lazy.
 * @param parserOptions
 */
export function verifyParserOptionsIsNonLazy(parserOptions: RequiredParserOptions<VLazyParserOptions | VParserOptions>): parserOptions is Required<VCommonParserOptions> & VParserOptions {
	return !parserOptions.lazy && (typeof parserOptions.optionDefinitions != 'function');
}
function verifyParsedCommandType(parsedMessage: VParsedMessage<RequiredParserOptions<VLazyParserOptions | VParserOptions>>): parsedMessage is VParsedMessage<Required<VCommonParserOptions> & VParserOptions> {
	return verifyParserOptionsIsNonLazy(parsedMessage.parserOptions);
}
function verifyLazyParsedCommandType(parsedMessage: VParsedMessage<RequiredParserOptions<VLazyParserOptions | VParserOptions>>): parsedMessage is VParsedMessage<Required<VCommonParserOptions> & VLazyParserOptions> {
	return !verifyParsedCommandType(parsedMessage);
}

export class VCommandParser {
	static readonly DEFAULT_COMMAND_PREFIX = '!';
	static readonly DEFAULT_OPTION_PREFIX = '-';
	
	/**
	 * This function parses a string and gets the component if the string is in the format `{PREFIX}{COMMAND} [{content}] [{OPTION_PREFIX}{OPTION} [{OPTION_CONTENT}] [{content}]]*` (where anything between `[]` is optional, and an `*` means multiple times).
	 *
	 * @param message String that potentially contains a command.
	 *
	 * @param parserOptions Options used to customize the behavior of the parser.
	 *
	 * @example VCommandParser.parse('!command --option "Option content"')
	 * @example VCommandParser.parse('%%command --option "Option content"', {commandPrefix: '%%'})
	 *
	 * @returns `VParsedCommand` instance containing the results of the parsing.
	 */
	static parse(message: string, parserOptions?: VParserOptions): VParsedCommand;
	/**
	 * This function parses a string and gets the component if the string is in the format `{PREFIX}{COMMAND} [{content}] [{OPTION_PREFIX}{OPTION} [{OPTION_CONTENT}] [{content}]]*` (where anything between `[]` is optional, and an `*` means multiple times).
	 *
	 * With the specified options, the message will be lazily parsed, meaning only the command is processed.
	 * To process options, you can either use the `parsedCommand.doParseOptions()` function or set the option definitions using `parsedCommand.setOptionDefinitions(definitions)`.
	 *
	 * @param message String that potentially contains a command.
	 *
	 * @param parserOptions Options used to customize the behavior of the parser.
	 *
	 * @example VCommandParser.parse('!command --option "Option content"', {lazy: true})
	 * @example VCommandParser.parse('%%command --option "Option content"', {commandPrefix: '%%', lazy: true})
	 * @example VCommandParser.parse('!command --option "Option content"', {optionDefinitions: () => [...]})
	 *
	 * @returns `VLazyParsedCommand` instance containing the results of the parsing.
	 */
	static parse(message: string, parserOptions?: VLazyParserOptions): VLazyParsedCommand;
	
	static parse(message: string, parserOptions?: VLazyParserOptions | VParserOptions): VLazyParsedCommand | VParsedCommand {
		const options = mergeWithDefaultParserOptions(parserOptions);
		
		const parsedMessage = doParseMessage(message, options);
		
		if (verifyParsedCommandType(parsedMessage)) {
			return new VParsedCommand(message, parsedMessage);
		} else if (verifyLazyParsedCommandType(parsedMessage)) {
			return new VLazyParsedCommand(message, parsedMessage);
		} else {
			throw new Error('An internal error as occurred');
		}
	}
}

export default VCommandParser.parse;
