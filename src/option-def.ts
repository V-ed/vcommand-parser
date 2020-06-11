export default class OptionDef {
	readonly calls: string[];
	
	readonly acceptsContent: boolean;
	
	readonly weight: number;
	
	readonly description?: string;
	
	constructor(calls: string | string[], acceptsContent = true, weight: number, description?: string) {
		this.calls = Array.isArray(calls) ? calls : [calls];
		this.acceptsContent = acceptsContent;
		this.weight = weight;
		this.description = description;
	}
}
