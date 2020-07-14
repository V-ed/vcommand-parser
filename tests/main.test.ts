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
	
	it('should parse message and define isCommand to true', () => {
		const parsed = VCommandParser.parse('!mycommand my content');
		
		expect(parsed.isCommand).toBeTruthy();
	});
});

describe('Testing VParsedCommand basic functions', () => {
	describe('getOption function', () => {
		it('should return undefined when no option', () => {
			const parsed = VCommandParser.parse('!mycommand');
			
			const option = parsed.getOption('option');
			
			expect(option).toBeUndefined();
		});
		
		it('should return undefined when option not in request', () => {
			const parsed = VCommandParser.parse('!mycommand --option');
			
			const option = parsed.getOption('stuff');
			
			expect(option).toBeUndefined();
		});
	});
});

describe('Non-commands parsing behaviors', () => {
	it('should parse message and define isCommand to false', () => {
		const parsed = VCommandParser.parse('this is a message');
		
		expect(parsed.isCommand).toBeFalsy();
		expect(parsed.command).toBeUndefined();
	});
	
	it('should parse message and not parse options', () => {
		const parsed = VCommandParser.parse('this is --a message');
		
		expect(parsed.options).toBeUndefined();
		expect(parsed.content).toBe('this is --a message');
	});
});
