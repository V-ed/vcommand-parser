import OptionPrefix from './@types/OptionPrefix';
import { parseMessage } from './message-parser';
import OptionDef from './option-def';
import { VLazyParsedCommand, VParsedCommand } from './vparsedcommand';

export class VCommandParser {
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

export default VCommandParser;
