import OptionPrefix from './@types/OptionPrefix';
import parseMessage from './message-parser';

export class VCommandParser {
	static readonly DEFAULT_COMMAND_PREFIX = '!';
	static readonly DEFAULT_OPTION_PREFIX = '-';
	
	readonly message: string;
	
	readonly command?: string;
	readonly content?: string;
	
	readonly prefix: string;
	readonly optionPrefix: OptionPrefix;
	
	constructor(message: string, prefix = VCommandParser.DEFAULT_COMMAND_PREFIX, optionPrefix: OptionPrefix = VCommandParser.DEFAULT_OPTION_PREFIX) {
		this.message = message;
		this.prefix = prefix;
		this.optionPrefix = optionPrefix;
		
		({
			command: this.command,
			content: this.content
		} = parseMessage(this.message, prefix));
	}
}
