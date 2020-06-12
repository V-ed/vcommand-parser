/* eslint-disable no-magic-numbers */

import OptionDef from '../src/option-def';
import VCommandParser from '../src/vcommandparser';

const optionDefinitions = [
	new OptionDef('long', true, 1, 'This is my long description'),
	new OptionDef('s', true, 1, 'This is my short description')
];

const optionDefinitionsNoContent = [
	new OptionDef('long', false, 1, 'This is my long description'),
	new OptionDef('s', false, 1, 'This is my short description')
];

describe('default option prefix with definitions', () => {
	describe('Messages with basic options', () => {
		describe('options do accept', () => {
			it('should contain one defined long option', () => {
				const parsed = VCommandParser.parse('!mycommand --long', undefined, undefined, optionDefinitions);
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 'long'});
					expect(option.definition).toBeDefined();
				}
			});
			
			it('should contain one defined short option', () => {
				const parsed = VCommandParser.parse('!mycommand -s', undefined, undefined, optionDefinitions);
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 's'});
					expect(option.definition).toBeDefined();
				}
			});
			
			it('should contain one defined long option with content', () => {
				const parsed = VCommandParser.parse('!mycommand --long content', undefined, undefined, optionDefinitions);
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 'long', content: 'content'});
					expect(option.definition).toBeDefined();
				}
			});
			
			it('should contain one defined short option with content', () => {
				const parsed = VCommandParser.parse('!mycommand -s content', undefined, undefined, optionDefinitions);
				
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
				const parsed = VCommandParser.parse('!mycommand --long', undefined, undefined, optionDefinitionsNoContent);
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 'long'});
					expect(option.definition).toBeDefined();
				}
			});
			
			it('should contain one defined short option', () => {
				const parsed = VCommandParser.parse('!mycommand -s', undefined, undefined, optionDefinitionsNoContent);
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 's'});
					expect(option.definition).toBeDefined();
				}
			});
			
			it('should contain one defined long option with content', () => {
				const parsed = VCommandParser.parse('!mycommand --long content', undefined, undefined, optionDefinitionsNoContent);
				
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
				const parsed = VCommandParser.parse('!mycommand -s content', undefined, undefined, optionDefinitionsNoContent);
				
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
		new OptionDef(['l', 'long'], true, 1, 'This is my long description'),
		new OptionDef(['s', 'short'], true, 2, 'This is my short description')
	];
	
	describe('retrieving options from command parser', () => {
		it('should retrieve long option by short call', () => {
			const parsed = VCommandParser.parse('!mycommand --long', undefined, undefined, optionDefinitionsMultipleCalls);
			
			const option = parsed.getOption('l');
			
			expect(option).toBeDefined();
			expect(option?.name).toBe('long');
		});
		
		it('should retrieve short option by long call', () => {
			const parsed = VCommandParser.parse('!mycommand -s', undefined, undefined, optionDefinitionsMultipleCalls);
			
			const option = parsed.getOption('short');
			
			expect(option).toBeDefined();
			expect(option?.name).toBe('s');
		});
	});
});
