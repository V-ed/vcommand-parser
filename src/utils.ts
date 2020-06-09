export function splitSpacesExcludeQuotes(string: string): string[] {
	const groupsRegex = /[^\s"']+|(?:")(?!")([^"]*)(?:")|(?:')(?!')([^']*)(?:')/g;
	
	const matches: string[] = [];
	
	let match;

	while ((match = groupsRegex.exec(string))) {
		const value = match.filter(x => x).pop();
		
		value && matches.push(value);
	}
	
	return matches;
}
