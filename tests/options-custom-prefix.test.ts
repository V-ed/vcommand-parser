/* eslint-disable no-magic-numbers */

import VCommandParser from '../src/vcommandparser';

describe('custom option prefix', () => {
	describe('Messages with basic options', () => {
		it('should contain one long option', () => {
			const parsed = VCommandParser.parse('!mycommand ~~long', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(1);
				expect(parsed.options[0]).toMatchObject({name: 'long'});
			}
		});
		
		it('should contain one short option', () => {
			const parsed = VCommandParser.parse('!mycommand ~s', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(1);
				expect(parsed.options[0]).toMatchObject({name: 's'});
			}
		});
		
		it('should contain two short option stickied', () => {
			const parsed = VCommandParser.parse('!mycommand ~sh', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(2);
				expect(parsed.options[0]).toMatchObject({name: 's'});
				expect(parsed.options[1]).toMatchObject({name: 'h'});
			}
		});
		
		it('should contain five short option stickied', () => {
			const parsed = VCommandParser.parse('!mycommand ~short', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(5);
				expect(parsed.options[0]).toMatchObject({name: 's'});
				expect(parsed.options[1]).toMatchObject({name: 'h'});
				expect(parsed.options[2]).toMatchObject({name: 'o'});
				expect(parsed.options[3]).toMatchObject({name: 'r'});
				expect(parsed.options[4]).toMatchObject({name: 't'});
			}
		});
		
		it('should contain two long option', () => {
			const parsed = VCommandParser.parse('!mycommand ~~long1 ~~long2', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(2);
				expect(parsed.options[0]).toMatchObject({name: 'long1'});
				expect(parsed.options[1]).toMatchObject({name: 'long2'});
			}
		});
		
		it('should contain three long option', () => {
			const parsed = VCommandParser.parse('!mycommand ~~long1 ~~long2 ~~long3', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(3);
				expect(parsed.options[0]).toMatchObject({name: 'long1'});
				expect(parsed.options[1]).toMatchObject({name: 'long2'});
				expect(parsed.options[2]).toMatchObject({name: 'long3'});
			}
		});
		
		it('should contain two short option', () => {
			const parsed = VCommandParser.parse('!mycommand ~s ~h', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(2);
				expect(parsed.options[0]).toMatchObject({name: 's'});
				expect(parsed.options[1]).toMatchObject({name: 'h'});
			}
		});
		
		it('should contain three short option', () => {
			const parsed = VCommandParser.parse('!mycommand ~s ~h ~o', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(3);
				expect(parsed.options[0]).toMatchObject({name: 's'});
				expect(parsed.options[1]).toMatchObject({name: 'h'});
				expect(parsed.options[2]).toMatchObject({name: 'o'});
			}
		});
		
		it('should contain four short option, 2 stickied groups', () => {
			const parsed = VCommandParser.parse('!mycommand ~sh ~or', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(4);
				expect(parsed.options[0]).toMatchObject({name: 's'});
				expect(parsed.options[1]).toMatchObject({name: 'h'});
				expect(parsed.options[2]).toMatchObject({name: 'o'});
				expect(parsed.options[3]).toMatchObject({name: 'r'});
			}
		});
	});
	
	describe('Messages with basic options and content', () => {
		it('should contain one long option', () => {
			const parsed = VCommandParser.parse('!mycommand ~~long content', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(1);
				expect(parsed.options[0]).toMatchObject({name: 'long', content: 'content'});
			}
		});
		
		it('should contain one short option', () => {
			const parsed = VCommandParser.parse('!mycommand ~s content', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(1);
				expect(parsed.options[0]).toMatchObject({name: 's', content: 'content'});
			}
		});
		
		it('should contain two short option stickied', () => {
			const parsed = VCommandParser.parse('!mycommand ~sh content', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(2);
				expect(parsed.options[0]).toMatchObject({name: 's', content: undefined});
				expect(parsed.options[1]).toMatchObject({name: 'h', content: 'content'});
			}
		});
		
		it('should contain five short option stickied', () => {
			const parsed = VCommandParser.parse('!mycommand ~short content', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(5);
				expect(parsed.options[0]).toMatchObject({name: 's', content: undefined});
				expect(parsed.options[1]).toMatchObject({name: 'h', content: undefined});
				expect(parsed.options[2]).toMatchObject({name: 'o', content: undefined});
				expect(parsed.options[3]).toMatchObject({name: 'r', content: undefined});
				expect(parsed.options[4]).toMatchObject({name: 't', content: 'content'});
			}
		});
		
		it('should contain two long option', () => {
			const parsed = VCommandParser.parse('!mycommand ~~long1 content1 ~~long2 content2', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(2);
				expect(parsed.options[0]).toMatchObject({name: 'long1', content: 'content1'});
				expect(parsed.options[1]).toMatchObject({name: 'long2', content: 'content2'});
			}
		});
		
		it('should contain three long option', () => {
			const parsed = VCommandParser.parse('!mycommand ~~long1 content1 ~~long2 content2 ~~long3 content3', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(3);
				expect(parsed.options[0]).toMatchObject({name: 'long1', content: 'content1'});
				expect(parsed.options[1]).toMatchObject({name: 'long2', content: 'content2'});
				expect(parsed.options[2]).toMatchObject({name: 'long3', content: 'content3'});
			}
		});
		
		it('should contain three long option only one content', () => {
			const parsed = VCommandParser.parse('!mycommand ~~long1 ~~long2 content ~~long3', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(3);
				expect(parsed.options[0]).toMatchObject({name: 'long1', content: undefined});
				expect(parsed.options[1]).toMatchObject({name: 'long2', content: 'content'});
				expect(parsed.options[2]).toMatchObject({name: 'long3', content: undefined});
			}
		});
		
		it('should contain two short option', () => {
			const parsed = VCommandParser.parse('!mycommand ~s content1 ~h content2', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(2);
				expect(parsed.options[0]).toMatchObject({name: 's', content: 'content1'});
				expect(parsed.options[1]).toMatchObject({name: 'h', content: 'content2'});
			}
		});
		
		it('should contain three short option', () => {
			const parsed = VCommandParser.parse('!mycommand ~s content1 ~h content2 ~o content3', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(3);
				expect(parsed.options[0]).toMatchObject({name: 's', content: 'content1'});
				expect(parsed.options[1]).toMatchObject({name: 'h', content: 'content2'});
				expect(parsed.options[2]).toMatchObject({name: 'o', content: 'content3'});
			}
		});
		
		it('should contain three short option only one content', () => {
			const parsed = VCommandParser.parse('!mycommand ~s ~h content ~o', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(3);
				expect(parsed.options[0]).toMatchObject({name: 's', content: undefined});
				expect(parsed.options[1]).toMatchObject({name: 'h', content: 'content'});
				expect(parsed.options[2]).toMatchObject({name: 'o', content: undefined});
			}
		});
		
		it('should contain four short option, 2 stickied groups', () => {
			const parsed = VCommandParser.parse('!mycommand ~sh content1 ~or content2', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(4);
				expect(parsed.options[0]).toMatchObject({name: 's', content: undefined});
				expect(parsed.options[1]).toMatchObject({name: 'h', content: 'content1'});
				expect(parsed.options[2]).toMatchObject({name: 'o', content: undefined});
				expect(parsed.options[3]).toMatchObject({name: 'r', content: 'content2'});
			}
		});
	});
	
	describe('Messages with content and basic options and content', () => {
		it('should contain one long option', () => {
			const parsed = VCommandParser.parse('!mycommand mycontent ~~long content', undefined, '~');
			
			expect(parsed.content).toBe('mycontent');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(1);
				expect(parsed.options[0]).toMatchObject({name: 'long', content: 'content'});
			}
		});
		
		it('should contain one long option and spaced content', () => {
			const parsed = VCommandParser.parse('!mycommand my content ~~long content', undefined, '~');
			
			expect(parsed.content).toBe('my content');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(1);
				expect(parsed.options[0]).toMatchObject({name: 'long', content: 'content'});
			}
		});
		
		it('should contain one long option content after', () => {
			const parsed = VCommandParser.parse('!mycommand ~~long content mycontent', undefined, '~');
			
			expect(parsed.content).toBe('mycontent');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(1);
				expect(parsed.options[0]).toMatchObject({name: 'long', content: 'content'});
			}
		});
		
		it('should contain one long option and spaced content after', () => {
			const parsed = VCommandParser.parse('!mycommand ~~long content my content', undefined, '~');
			
			expect(parsed.content).toBe('my content');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(1);
				expect(parsed.options[0]).toMatchObject({name: 'long', content: 'content'});
			}
		});
		
		it('should contain one short option', () => {
			const parsed = VCommandParser.parse('!mycommand mcontent ~s content', undefined, '~');
			
			expect(parsed.content).toBe('mcontent');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(1);
				expect(parsed.options[0]).toMatchObject({name: 's', content: 'content'});
			}
		});
		
		it('should contain one short option and spaced content', () => {
			const parsed = VCommandParser.parse('!mycommand my content ~s content', undefined, '~');
			
			expect(parsed.content).toBe('my content');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(1);
				expect(parsed.options[0]).toMatchObject({name: 's', content: 'content'});
			}
		});
		
		it('should contain one short option after', () => {
			const parsed = VCommandParser.parse('!mycommand ~s content mcontent', undefined, '~');
			
			expect(parsed.content).toBe('mcontent');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(1);
				expect(parsed.options[0]).toMatchObject({name: 's', content: 'content'});
			}
		});
		
		it('should contain one short option and spaced content after', () => {
			const parsed = VCommandParser.parse('!mycommand ~s content my content', undefined, '~');
			
			expect(parsed.content).toBe('my content');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(1);
				expect(parsed.options[0]).toMatchObject({name: 's', content: 'content'});
			}
		});
		
		it('should contain two short option stickied', () => {
			const parsed = VCommandParser.parse('!mycommand ~sh content', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(2);
				expect(parsed.options[0]).toMatchObject({name: 's', content: undefined});
				expect(parsed.options[1]).toMatchObject({name: 'h', content: 'content'});
			}
		});
		
		it('should contain five short option stickied', () => {
			const parsed = VCommandParser.parse('!mycommand ~short content', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(5);
				expect(parsed.options[0]).toMatchObject({name: 's', content: undefined});
				expect(parsed.options[1]).toMatchObject({name: 'h', content: undefined});
				expect(parsed.options[2]).toMatchObject({name: 'o', content: undefined});
				expect(parsed.options[3]).toMatchObject({name: 'r', content: undefined});
				expect(parsed.options[4]).toMatchObject({name: 't', content: 'content'});
			}
		});
		
		it('should contain two long option', () => {
			const parsed = VCommandParser.parse('!mycommand ~~long1 content1 ~~long2 content2', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(2);
				expect(parsed.options[0]).toMatchObject({name: 'long1', content: 'content1'});
				expect(parsed.options[1]).toMatchObject({name: 'long2', content: 'content2'});
			}
		});
		
		it('should contain three long option', () => {
			const parsed = VCommandParser.parse('!mycommand ~~long1 content1 ~~long2 content2 ~~long3 content3', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(3);
				expect(parsed.options[0]).toMatchObject({name: 'long1', content: 'content1'});
				expect(parsed.options[1]).toMatchObject({name: 'long2', content: 'content2'});
				expect(parsed.options[2]).toMatchObject({name: 'long3', content: 'content3'});
			}
		});
		
		it('should contain three long option only one content', () => {
			const parsed = VCommandParser.parse('!mycommand ~~long1 ~~long2 content ~~long3', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(3);
				expect(parsed.options[0]).toMatchObject({name: 'long1', content: undefined});
				expect(parsed.options[1]).toMatchObject({name: 'long2', content: 'content'});
				expect(parsed.options[2]).toMatchObject({name: 'long3', content: undefined});
			}
		});
		
		it('should contain two short option', () => {
			const parsed = VCommandParser.parse('!mycommand ~s content1 ~h content2', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(2);
				expect(parsed.options[0]).toMatchObject({name: 's', content: 'content1'});
				expect(parsed.options[1]).toMatchObject({name: 'h', content: 'content2'});
			}
		});
		
		it('should contain three short option', () => {
			const parsed = VCommandParser.parse('!mycommand ~s content1 ~h content2 ~o content3', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(3);
				expect(parsed.options[0]).toMatchObject({name: 's', content: 'content1'});
				expect(parsed.options[1]).toMatchObject({name: 'h', content: 'content2'});
				expect(parsed.options[2]).toMatchObject({name: 'o', content: 'content3'});
			}
		});
		
		it('should contain three short option only one content', () => {
			const parsed = VCommandParser.parse('!mycommand ~s ~h content ~o', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(3);
				expect(parsed.options[0]).toMatchObject({name: 's', content: undefined});
				expect(parsed.options[1]).toMatchObject({name: 'h', content: 'content'});
				expect(parsed.options[2]).toMatchObject({name: 'o', content: undefined});
			}
		});
		
		it('should contain four short option, 2 stickied groups', () => {
			const parsed = VCommandParser.parse('!mycommand ~sh content1 ~or content2', undefined, '~');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(4);
				expect(parsed.options[0]).toMatchObject({name: 's', content: undefined});
				expect(parsed.options[1]).toMatchObject({name: 'h', content: 'content1'});
				expect(parsed.options[2]).toMatchObject({name: 'o', content: undefined});
				expect(parsed.options[3]).toMatchObject({name: 'r', content: 'content2'});
			}
		});
	});
	
	describe('Messages with option stopper', () => {
		it('should contain content only', () => {
			const parsed = VCommandParser.parse('!mycommand ~~ content', undefined, '~');
			
			expect(parsed.content).toBe('content');
		});
		
		it('should contain both content only', () => {
			const parsed = VCommandParser.parse('!mycommand my ~~ content', undefined, '~');
			
			expect(parsed.content).toBe('my content');
		});
		
		it('should contain one long option and content', () => {
			const parsed = VCommandParser.parse('!mycommand ~~long ~~ content', undefined, '~');
			
			expect(parsed.content).toBe('content');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(1);
				expect(parsed.options[0]).toMatchObject({name: 'long'});
			}
		});
		
		it('should contain one long option and option like content', () => {
			const parsed = VCommandParser.parse('!mycommand ~~long ~~ ~~content', undefined, '~');
			
			expect(parsed.content).toBe('~~content');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(1);
				expect(parsed.options[0]).toMatchObject({name: 'long'});
			}
		});
		
		it('should contain one short option and content', () => {
			const parsed = VCommandParser.parse('!mycommand ~s ~~ content', undefined, '~');
			
			expect(parsed.content).toBe('content');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(1);
				expect(parsed.options[0]).toMatchObject({name: 's'});
			}
		});
		
		it('should contain one short option and option like content', () => {
			const parsed = VCommandParser.parse('!mycommand ~s ~~ ~~content', undefined, '~');
			
			expect(parsed.content).toBe('~~content');
			
			expect(parsed.options).toBeDefined();
			if (parsed.options) {
				expect(parsed.options.length).toBe(1);
				expect(parsed.options[0]).toMatchObject({name: 's'});
			}
		});
		
		it('should contain stopper as content', () => {
			const parsed = VCommandParser.parse('!mycommand "~~"', undefined, '~');
			
			expect(parsed.content).toBe('~~');
		});
	});
});
