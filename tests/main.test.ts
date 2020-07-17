/* eslint-disable @typescript-eslint/no-magic-numbers */

import VCommandParser from '../src/vcommandparser';

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
	});
});

describe('Lazy parsing', () => {
	describe('Basic Message Parsing', () => {
		it('should return correct command', () => {
			const parsed = VCommandParser.parseLazy('!mycommand');
			
			expect(parsed.command).toBe('mycommand');
		});
		
		it('should return correct command and content', () => {
			const parsed = VCommandParser.parseLazy('!mycommand my content');
			
			expect(parsed.command).toBe('mycommand');
			expect(parsed.content).toBe('my content');
		});
		
		it('should return correct command with custom prefix', () => {
			const parsed = VCommandParser.parseLazy('\\mycommand', '\\');
			
			expect(parsed.command).toBe('mycommand');
		});
		
		it('should return correct command and content with custom prefix', () => {
			const parsed = VCommandParser.parseLazy('\\mycommand my content', '\\');
			
			expect(parsed.command).toBe('mycommand');
			expect(parsed.content).toBe('my content');
		});
		
		it('should parse message and define isCommand to true', () => {
			const parsed = VCommandParser.parseLazy('!mycommand my content');
			
			expect(parsed.isCommand).toBeTruthy();
		});
	});
	
	describe('Testing VLazyParsedCommand basic functions', () => {
		describe('getOption function with string', () => {
			it('should return undefined when no option', () => {
				const parsed = VCommandParser.parseLazy('!mycommand');
				
				parsed.doParseOptions();
				
				const option = parsed.getOption('option');
				
				expect(option).toBeUndefined();
			});
			
			it('should return undefined when option not in request', () => {
				const parsed = VCommandParser.parseLazy('!mycommand --option');
				
				parsed.doParseOptions();
				
				const option = parsed.getOption('stuff');
				
				expect(option).toBeUndefined();
			});
			
			it('should return option with correct name', () => {
				const parsed = VCommandParser.parseLazy('!mycommand --option');
				
				parsed.doParseOptions();
				
				const option = parsed.getOption('option');
				
				expect(option).toBeDefined();
				expect(option!.name).toBe('option');
			});
			
			it('should return option with correct name despite multiple options', () => {
				const parsed = VCommandParser.parseLazy('!mycommand --option1 --option2');
				
				parsed.doParseOptions();
				
				const option = parsed.getOption('option2');
				
				expect(option).toBeDefined();
				expect(option!.name).toBe('option2');
			});
		});
		
		describe('getOption function with number', () => {
			it('should return undefined when no option', () => {
				const parsed = VCommandParser.parseLazy('!mycommand');
				
				parsed.doParseOptions();
				
				const option = parsed.getOption(1);
				
				expect(option).toBeUndefined();
			});
			
			it('should return undefined when no option with position', () => {
				const parsed = VCommandParser.parseLazy('!mycommand --option');
				
				parsed.doParseOptions();
				
				const option = parsed.getOption(2);
				
				expect(option).toBeUndefined();
			});
			
			it('should return option with correct position', () => {
				const parsed = VCommandParser.parseLazy('!mycommand --option');
				
				parsed.doParseOptions();
				
				const option = parsed.getOption(0);
				
				expect(option).toBeDefined();
				expect(option!.name).toBe('option');
			});
			
			it('should return option with correct position despite multiple options', () => {
				const parsed = VCommandParser.parseLazy('!mycommand --option1 --option2');
				
				parsed.doParseOptions();
				
				const option = parsed.getOption(1);
				
				expect(option).toBeDefined();
				expect(option!.name).toBe('option2');
			});
		});
	});
	
	describe('Non-commands parsing behaviors', () => {
		it('should parse message and define isCommand to false', () => {
			const parsed = VCommandParser.parseLazy('this is a message');
			
			expect(parsed.isCommand).toBeFalsy();
			expect(parsed.command).toBeUndefined();
		});
		
		it('should parse message and not parse options', () => {
			const parsed = VCommandParser.parseLazy('this is --a message');
			
			expect(parsed.options).toBeUndefined();
			expect(parsed.content).toBe('this is --a message');
		});
	});
});
