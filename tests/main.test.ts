/* eslint-disable @typescript-eslint/no-magic-numbers */

import VCommandParser from '../src/vcommandparser';
import VLazyParsedCommand, { VParsedCommand } from '../src/vparsedcommand';

describe('Testing value types', () => {
	it('parsed object should be of type VParsedCommand', () => {
		const parsed = VCommandParser.parse('!mycommand');
		
		expect(parsed instanceof VParsedCommand).toBeTruthy();
	});
	
	it('parsed object should be of type VLazyParsedCommand', () => {
		const parsed = VCommandParser.parse('!mycommand', {lazy: true});
		
		expect(parsed instanceof VLazyParsedCommand).toBeTruthy();
	});
	
	it('parsed object should be of type VLazyParsedCommand when custom optionDefs', () => {
		const parsed = VCommandParser.parse('!mycommand', {optionDefinitions: () => []});
		
		expect(parsed instanceof VLazyParsedCommand).toBeTruthy();
	});
});

describe('Non-lazy parsing', () => {
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
			const parsed = VCommandParser.parse('\\mycommand', {commandPrefix: '\\'});
			
			expect(parsed.command).toBe('mycommand');
		});
		
		it('should return correct command and content with custom prefix', () => {
			const parsed = VCommandParser.parse('\\mycommand my content', {commandPrefix: '\\'});
			
			expect(parsed.command).toBe('mycommand');
			expect(parsed.content).toBe('my content');
		});
		
		it('should parse message and define isCommand to true', () => {
			const parsed = VCommandParser.parse('!mycommand my content');
			
			expect(parsed.isCommand).toBeTruthy();
		});
		
		it('should return proper content and options', () => {
			const parsed = VCommandParser.parse('!mycommand content --option option_content');
			
			expect(parsed.command).toBe('mycommand');
			expect(parsed.content).toBe('content');
			
			const option = parsed.getOption('option');
			
			expect(option).toBeDefined();
			expect(option!.content).toBe('option_content');
		});
	});
	
	describe('Testing VParsedCommand basic functions', () => {
		describe('getOption function with string', () => {
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
			
			it('should return option with correct name', () => {
				const parsed = VCommandParser.parse('!mycommand --option');
				
				const option = parsed.getOption('option');
				
				expect(option).toBeDefined();
				expect(option!.name).toBe('option');
			});
			
			it('should return option with correct name despite multiple options', () => {
				const parsed = VCommandParser.parse('!mycommand --option1 --option2');
				
				const option = parsed.getOption('option2');
				
				expect(option).toBeDefined();
				expect(option!.name).toBe('option2');
			});
		});
		
		describe('getOption function with number', () => {
			it('should return undefined when no option', () => {
				const parsed = VCommandParser.parse('!mycommand');
				
				const option = parsed.getOption(1);
				
				expect(option).toBeUndefined();
			});
			
			it('should return undefined when no option with position', () => {
				const parsed = VCommandParser.parse('!mycommand --option');
				
				const option = parsed.getOption(2);
				
				expect(option).toBeUndefined();
			});
			
			it('should return option with correct position', () => {
				const parsed = VCommandParser.parse('!mycommand --option');
				
				const option = parsed.getOption(0);
				
				expect(option).toBeDefined();
				expect(option!.name).toBe('option');
			});
			
			it('should return option with correct position despite multiple options', () => {
				const parsed = VCommandParser.parse('!mycommand --option1 --option2');
				
				const option = parsed.getOption(1);
				
				expect(option).toBeDefined();
				expect(option!.name).toBe('option2');
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
		
		it('should parse message and not parse as a command if there is a space between prefix and command', () => {
			const parsed = VCommandParser.parse('! not a command');
			
			expect(parsed.isCommand).toBeFalsy();
			expect(parsed.command).toBeUndefined();
			expect(parsed.content).toBe('! not a command');
		});
	});
});

describe('Lazy parsing', () => {
	describe('Basic Message Parsing', () => {
		it('should return correct command', () => {
			const parsed = VCommandParser.parse('!mycommand', {lazy: true});
			
			expect(parsed.command).toBe('mycommand');
		});
		
		it('should return correct command and content', () => {
			const parsed = VCommandParser.parse('!mycommand my content', {lazy: true});
			
			expect(parsed.command).toBe('mycommand');
			expect(parsed.content).toBe('my content');
		});
		
		it('should return correct command with custom prefix', () => {
			const parsed = VCommandParser.parse('\\mycommand', {commandPrefix: '\\', lazy: true});
			
			expect(parsed.command).toBe('mycommand');
		});
		
		it('should return correct command and content with custom prefix', () => {
			const parsed = VCommandParser.parse('\\mycommand my content', {commandPrefix: '\\', lazy: true});
			
			expect(parsed.command).toBe('mycommand');
			expect(parsed.content).toBe('my content');
		});
		
		it('should parse message and define isCommand to true', () => {
			const parsed = VCommandParser.parse('!mycommand my content', {lazy: true});
			
			expect(parsed.isCommand).toBeTruthy();
		});
		
		it('should return proper content and options', () => {
			const parsed = VCommandParser.parse('!mycommand content --option option_content', {lazy: true});
			
			expect(parsed.command).toBe('mycommand');
			expect(parsed.content).toBe('content --option option_content');
			
			const option1 = parsed.getOption('option');
			
			expect(option1).toBeUndefined();
			
			parsed.doParseOptions();
			
			expect(parsed.content).toBe('content');
			
			const option2 = parsed.getOption('option');
			
			expect(option2).toBeDefined();
			expect(option2!.content).toBe('option_content');
		});
	});
	
	describe('Testing VLazyParsedCommand basic functions', () => {
		describe('getOption function with string', () => {
			it('should return undefined when no option', () => {
				const parsed = VCommandParser.parse('!mycommand', {lazy: true});
				
				parsed.doParseOptions();
				
				const option = parsed.getOption('option');
				
				expect(option).toBeUndefined();
			});
			
			it('should return undefined when option not in request', () => {
				const parsed = VCommandParser.parse('!mycommand --option', {lazy: true});
				
				parsed.doParseOptions();
				
				const option = parsed.getOption('stuff');
				
				expect(option).toBeUndefined();
			});
			
			it('should return option with correct name', () => {
				const parsed = VCommandParser.parse('!mycommand --option', {lazy: true});
				
				parsed.doParseOptions();
				
				const option = parsed.getOption('option');
				
				expect(option).toBeDefined();
				expect(option!.name).toBe('option');
			});
			
			it('should return option with correct name despite multiple options', () => {
				const parsed = VCommandParser.parse('!mycommand --option1 --option2', {lazy: true});
				
				parsed.doParseOptions();
				
				const option = parsed.getOption('option2');
				
				expect(option).toBeDefined();
				expect(option!.name).toBe('option2');
			});
		});
		
		describe('getOption function with number', () => {
			it('should return undefined when no option', () => {
				const parsed = VCommandParser.parse('!mycommand', {lazy: true});
				
				parsed.doParseOptions();
				
				const option = parsed.getOption(1);
				
				expect(option).toBeUndefined();
			});
			
			it('should return undefined when no option with position', () => {
				const parsed = VCommandParser.parse('!mycommand --option', {lazy: true});
				
				parsed.doParseOptions();
				
				const option = parsed.getOption(2);
				
				expect(option).toBeUndefined();
			});
			
			it('should return option with correct position', () => {
				const parsed = VCommandParser.parse('!mycommand --option', {lazy: true});
				
				parsed.doParseOptions();
				
				const option = parsed.getOption(0);
				
				expect(option).toBeDefined();
				expect(option!.name).toBe('option');
			});
			
			it('should return option with correct position despite multiple options', () => {
				const parsed = VCommandParser.parse('!mycommand --option1 --option2', {lazy: true});
				
				parsed.doParseOptions();
				
				const option = parsed.getOption(1);
				
				expect(option).toBeDefined();
				expect(option!.name).toBe('option2');
			});
		});
	});
	
	describe('Non-commands parsing behaviors', () => {
		it('should parse message and define isCommand to false', () => {
			const parsed = VCommandParser.parse('this is a message', {lazy: true});
			
			expect(parsed.isCommand).toBeFalsy();
			expect(parsed.command).toBeUndefined();
		});
		
		it('should parse message and not parse options', () => {
			const parsed = VCommandParser.parse('this is --a message', {lazy: true});
			
			expect(parsed.options).toBeUndefined();
			expect(parsed.content).toBe('this is --a message');
		});
		
		it('should parse message and not parse as a command if there is a space between prefix and command', () => {
			const parsed = VCommandParser.parse('! not a command', {lazy: true});
			
			expect(parsed.isCommand).toBeFalsy();
			expect(parsed.command).toBeUndefined();
			expect(parsed.content).toBe('! not a command');
		});
	});
});
