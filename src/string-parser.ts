export default function parseMessage(message: string, commandPrefix: string) {
	const extractedData = extractCommandAndContent(message, commandPrefix);
	
	return extractedData;
}

function extractCommandAndContent(message: string, commandPrefix: string) {
	const isCommand = message.startsWith(commandPrefix);
	
	let command = undefined;
	let content = message;
	
	if (isCommand) {
		const noPrefixMessage = message.slice(commandPrefix.length).trim();
		
		// eslint-disable-next-line no-magic-numbers
		const splittedMessage = noPrefixMessage.replace(/\s+/g, ' ').split(/ /, 2);
		
		command = splittedMessage[0];
		content = splittedMessage[1];
	}
	
	return {
		command: command,
		content: content
	};
}
