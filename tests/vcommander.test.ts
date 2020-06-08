import { VCommander } from '../src/vcommander';

describe('Basic Message Parsing', () => {
	it('should return correct command', () => {
		const testCommander = new VCommander('!mycommand');
		
		expect(testCommander.command).toBe('mycommand');
	});
	
	it('should return correct command and content', () => {
		const testCommander = new VCommander('!mycommand my content');
		
		expect(testCommander.command).toBe('mycommand');
		expect(testCommander.content).toBe('my content');
	});
	
	it('should return correct command with custom prefix', () => {
		const testCommander = new VCommander('\\mycommand', '\\');
		
		expect(testCommander.command).toBe('mycommand');
	});
	
	it('should return correct command and content with custom prefix', () => {
		const testCommander = new VCommander('\\mycommand my content', '\\');
		
		expect(testCommander.command).toBe('mycommand');
		expect(testCommander.content).toBe('my content');
	});
});
