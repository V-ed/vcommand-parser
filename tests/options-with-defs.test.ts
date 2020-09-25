/* eslint-disable @typescript-eslint/no-magic-numbers */

import OptionDef from '../src/option-def';
import VCommandParser from '../src/vcommandparser';

const optionDefinitions = [
	new OptionDef('long', {description: 'This is my long description', acceptsContent: true}),
	new OptionDef('s', {description: 'This is my short description', acceptsContent: true})
];

const optionDefinitionsNoContent = [
	new OptionDef('long', {description: 'This is my long description', acceptsContent: false}),
	new OptionDef('s', {description: 'This is my short description', acceptsContent: false})
];

describe('default option prefix with definitions', () => {
	describe('Messages with basic options', () => {
		describe('options do accept', () => {
			it('should contain one defined long option', () => {
				const parsed = VCommandParser.parse('!mycommand --long', {optionDefinitions: optionDefinitions});
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 'long'});
					expect(option.definition).toBeDefined();
				}
			});
			
			it('should contain one defined short option', () => {
				const parsed = VCommandParser.parse('!mycommand -s', {optionDefinitions: optionDefinitions});
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 's'});
					expect(option.definition).toBeDefined();
				}
			});
			
			it('should contain one defined long option with content', () => {
				const parsed = VCommandParser.parse('!mycommand --long content', {optionDefinitions: optionDefinitions});
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 'long', content: 'content'});
					expect(option.definition).toBeDefined();
				}
			});
			
			it('should contain one defined short option with content', () => {
				const parsed = VCommandParser.parse('!mycommand -s content', {optionDefinitions: optionDefinitions});
				
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
				const parsed = VCommandParser.parse('!mycommand --long', {optionDefinitions: optionDefinitionsNoContent});
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 'long'});
					expect(option.definition).toBeDefined();
				}
			});
			
			it('should contain one defined short option', () => {
				const parsed = VCommandParser.parse('!mycommand -s', {optionDefinitions: optionDefinitionsNoContent});
				
				expect(parsed.options).toBeDefined();
				if (parsed.options) {
					expect(parsed.options.length).toBe(1);
					
					const option = parsed.options[0];
					
					expect(option).toMatchObject({name: 's'});
					expect(option.definition).toBeDefined();
				}
			});
			
			it('should contain one defined long option with content', () => {
				const parsed = VCommandParser.parse('!mycommand --long content', {optionDefinitions: optionDefinitionsNoContent});
				
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
				const parsed = VCommandParser.parse('!mycommand -s content', {optionDefinitions: optionDefinitionsNoContent});
				
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
		new OptionDef(['l', 'long'], {description: 'This is my long description', acceptsContent: true, weight: 1}),
		new OptionDef(['s', 'short'], {description: 'This is my short description', acceptsContent: true, weight: 2})
	];
	
	describe('retrieving options from command parser', () => {
		it('should retrieve long option by short call', () => {
			const parsed = VCommandParser.parse('!mycommand --long', {optionDefinitions: optionDefinitionsMultipleCalls});
			
			const option = parsed.getOption('l');
			
			expect(option).toBeDefined();
			expect(option?.name).toBe('long');
		});
		
		it('should retrieve short option by long call', () => {
			const parsed = VCommandParser.parse('!mycommand -s', {optionDefinitions: optionDefinitionsMultipleCalls});
			
			const option = parsed.getOption('short');
			
			expect(option).toBeDefined();
			expect(option?.name).toBe('s');
		});
	});
});
