import parseMessage from './message-parser';

export class VCommandParser {
	static readonly DEFAULT_COMMAND_PREFIX = '!';
	
	readonly message: string;
	
	readonly command?: string;
	readonly content?: string;
	
	constructor(message: string, prefix = VCommandParser.DEFAULT_COMMAND_PREFIX) {
		this.message = message;
		
		({command: this.command, content: this.content} = parseMessage(this.message, prefix));
	}
}
