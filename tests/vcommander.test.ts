/* eslint-disable no-magic-numbers */

import VCommandParser from '../src/vcommandparser';

describe('Basic Message Parsing', () => {
	it('should return correct command', () => {
		const testCommander = VCommandParser.parse('!mycommand');
		
		expect(testCommander.command).toBe('mycommand');
	});
	
	it('should return correct command and content', () => {
		const testCommander = VCommandParser.parse('!mycommand my content');
		
		expect(testCommander.command).toBe('mycommand');
		expect(testCommander.content).toBe('my content');
	});
	
	it('should return correct command with custom prefix', () => {
		const testCommander = VCommandParser.parse('\\mycommand', '\\');
		
		expect(testCommander.command).toBe('mycommand');
	});
	
	it('should return correct command and content with custom prefix', () => {
		const testCommander = VCommandParser.parse('\\mycommand my content', '\\');
		
		expect(testCommander.command).toBe('mycommand');
		expect(testCommander.content).toBe('my content');
	});
});
