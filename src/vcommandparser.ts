import OptionPrefix from './@types/OptionPrefix';
import MessageOption from './message-option';
import { ParsedMessage, parseMessage } from './message-parser';
import OptionDef from './option-def';

export default class VCommandParser {
	static readonly DEFAULT_COMMAND_PREFIX = '!';
	static readonly DEFAULT_OPTION_PREFIX = '-';
	
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
	
	getOption(name: string): MessageOption | undefined {
		return this.options?.find(option => option.definition?.calls.includes(name) || option.name == name);
	}
}
