export default function parseMessage(message: string, commandPrefix: string) {
	const extractedData = extractCommandAndContent(message, commandPrefix);
	
	return extractedData;
}

function extractCommandAndContent(message: string, commandPrefix: string) {
	const isCommand = message.startsWith(commandPrefix);
	
	let command = undefined;
	let content: string | undefined = message;
	
	if (isCommand) {
		const noPrefixMessage = message.slice(commandPrefix.length).trim();
		
		const commandContentSeparator = ' ';
		
		const [first, ...rest] = noPrefixMessage.replace(/\s+/g, ' ').split(commandContentSeparator);
		
		[command, content] = [first, rest.length ? rest.join(commandContentSeparator) : undefined];
	}
	
	return {
		command: command,
		content: content
	};
}
