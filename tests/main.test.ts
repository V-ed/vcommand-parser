/* eslint-disable @typescript-eslint/no-magic-numbers */

import VCommandParser from '../src/vcommandparser';

describe('Basic Message Parsing', () => {
	it('should return correct command', () => {
		const parsed = VCommandParser.parse('!mycommand');
		
		expect(parsed.command).toBe('mycommand');
	});
	
	it('should return correct command and content', () => {
		const parsed = VCommandParser.parse('!mycommand my content');
		
		expect(parsed.command).toBe('mycommand');
		expect(parsed.content).toBe('my content');
	});
	
	it('should return correct command with custom prefix', () => {
		const parsed = VCommandParser.parse('\\mycommand', '\\');
		
		expect(parsed.command).toBe('mycommand');
	});
	
	it('should return correct command and content with custom prefix', () => {
		const parsed = VCommandParser.parse('\\mycommand my content', '\\');
		
		expect(parsed.command).toBe('mycommand');
		expect(parsed.content).toBe('my content');
	});
});
