import OptionDef from './option-def';

export class MessageOption {
	readonly name: string;
	readonly content?: string;
	
	readonly position: number;
	
	readonly definition?: OptionDef;
	
	constructor(name: string, position: number, content?: string, definition?: OptionDef) {
		this.name = name;
		this.content = content;
		this.position = position;
		this.definition = definition;
	}
}

export default MessageOption;
