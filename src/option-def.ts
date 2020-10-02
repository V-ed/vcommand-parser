export type OptionBehavior = {
	acceptsContent: boolean,
	weight: number,
	description?: string,
}

export class OptionDef {
	static readonly DEFAULT_WEIGHT = 0;
	
	readonly calls: string[];
	
	readonly description?: string;
	
	readonly acceptsContent: boolean;
	
	readonly weight: number;
	
	constructor(calls: string | string[], options: Partial<OptionBehavior> = {}) {
		this.calls = Array.isArray(calls) ? calls : [calls];
		
		const defaultOptions: OptionBehavior = {
			acceptsContent: true,
			weight: OptionDef.DEFAULT_WEIGHT
		};
		
		const finalOptions: OptionBehavior = {...defaultOptions, ...options};
		
		({
			acceptsContent: this.acceptsContent,
			weight: this.weight,
			description: this.description
		} = finalOptions);
	}
}

export default OptionDef;
