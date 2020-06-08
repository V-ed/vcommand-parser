import parseMessage from './message-parser';

export const DEFAULT_COMMAND_PREFIX = '!';

export class VCommandParser {
	readonly message: string;
	
	readonly command?: string;
	readonly content?: string;
	
	constructor(message: string, prefix = DEFAULT_COMMAND_PREFIX) {
		this.message = message;
		
		({command: this.command, content: this.content} = parseMessage(this.message, prefix));
	}
}
