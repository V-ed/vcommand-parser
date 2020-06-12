export default class OptionDef {
	static readonly DEFAULT_WEIGHT = 0;
	
	readonly calls: string[];
	
	readonly acceptsContent: boolean;
	
	readonly weight: number;
	
	readonly description?: string;
	
	constructor(calls: string | string[], acceptsContent = true, description?: string, weight?: number) {
		this.calls = Array.isArray(calls) ? calls : [calls];
		this.acceptsContent = acceptsContent;
		this.description = description;
		this.weight = weight || OptionDef.DEFAULT_WEIGHT;
	}
}
