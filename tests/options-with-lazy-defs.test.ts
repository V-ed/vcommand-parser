/* eslint-disable @typescript-eslint/no-magic-numbers */

import OptionDef from '../src/option-def';
import VCommandParser from '../src/vcommandparser';

const optionDefinitions = [
	new OptionDef('long', true, 'This is my long description'),
	new OptionDef('s', true, 'This is my short description')
];

const optionDefinitionsNoContent = [
	new OptionDef('long', false, 'This is my long description'),
	new OptionDef('s', false, 'This is my short description')
];

describe('default option prefix with definitions', () => {
	describe('Messages with basic options', () => {
		describe('options do accept', () => {
			it('should contain one defined long option', () => {
				const parsed = VCommandParser.parseLazy('!mycommand --long');
				
				parsed.setOptionDefinitions(optionDefinitions);
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 'long'});
					expect(option.definition).toBeDefined();
				}
			});
			
			it('should contain one defined short option', () => {
				const parsed = VCommandParser.parseLazy('!mycommand -s');
				
				parsed.setOptionDefinitions(optionDefinitions);
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 's'});
					expect(option.definition).toBeDefined();
				}
			});
			
			it('should contain one defined long option with content', () => {
				const parsed = VCommandParser.parseLazy('!mycommand --long content');
				
				parsed.setOptionDefinitions(optionDefinitions);
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 'long', content: 'content'});
					expect(option.definition).toBeDefined();
				}
			});
			
			it('should contain one defined short option with content', () => {
				const parsed = VCommandParser.parseLazy('!mycommand -s content');
				
				parsed.setOptionDefinitions(optionDefinitions);
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 's', content: 'content'});
					expect(option.definition).toBeDefined();
				}
			});
		});
		
		describe('options do not accept', () => {
			it('should contain one defined long option', () => {
				const parsed = VCommandParser.parseLazy('!mycommand --long');
				
				parsed.setOptionDefinitions(optionDefinitionsNoContent);
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 'long'});
					expect(option.definition).toBeDefined();
				}
			});
			
			it('should contain one defined short option', () => {
				const parsed = VCommandParser.parseLazy('!mycommand -s');
				
				parsed.setOptionDefinitions(optionDefinitionsNoContent);
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 's'});
					expect(option.definition).toBeDefined();
				}
			});
			
			it('should contain one defined long option with content', () => {
				const parsed = VCommandParser.parseLazy('!mycommand --long content');
				
				parsed.setOptionDefinitions(optionDefinitionsNoContent);
				
				expect(parsed.content).toBe('content');
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 'long', content: undefined});
					expect(option.definition).toBeDefined();
				}
			});
			
			it('should contain one defined short option with content', () => {
				const parsed = VCommandParser.parseLazy('!mycommand -s content');
				
				parsed.setOptionDefinitions(optionDefinitionsNoContent);
				
				expect(parsed.content).toBe('content');
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 's', content: undefined});
					expect(option.definition).toBeDefined();
				}
			});
		});
	});
	
	const optionDefinitionsMultipleCalls = [
		new OptionDef(['l', 'long'], true, 'This is my long description', 1),
		new OptionDef(['s', 'short'], true, 'This is my short description', 2)
	];
	
	describe('retrieving options from command parser', () => {
		it('should retrieve long option by short call', () => {
			const parsed = VCommandParser.parseLazy('!mycommand --long');
			
			parsed.setOptionDefinitions(optionDefinitionsMultipleCalls);
			
			const option = parsed.getOption('l');
			
			expect(option).toBeDefined();
			expect(option?.name).toBe('long');
		});
		
		it('should retrieve short option by long call', () => {
			const parsed = VCommandParser.parseLazy('!mycommand -s');
			
			parsed.setOptionDefinitions(optionDefinitionsMultipleCalls);
			
			const option = parsed.getOption('short');
			
			expect(option).toBeDefined();
			expect(option?.name).toBe('s');
		});
	});
});
