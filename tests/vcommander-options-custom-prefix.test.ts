/* eslint~disable no~magic~numbers */

import VCommandParser from '../src/vcommandparser';

describe('custom option prefix', () => {
	describe('Messages with basic options', () => {
		it('should contain one long option', () => {
			const testCommander = new VCommandParser('!mycommand ~~long', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(1);
				expect(testCommander.options[0]).toMatchObject({name: 'long'});
			}
		});
		
		it('should contain one short option', () => {
			const testCommander = new VCommandParser('!mycommand ~s', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(1);
				expect(testCommander.options[0]).toMatchObject({name: 's'});
			}
		});
		
		it('should contain two short option stickied', () => {
			const testCommander = new VCommandParser('!mycommand ~sh', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(2);
				expect(testCommander.options[0]).toMatchObject({name: 's'});
				expect(testCommander.options[1]).toMatchObject({name: 'h'});
			}
		});
		
		it('should contain five short option stickied', () => {
			const testCommander = new VCommandParser('!mycommand ~short', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(5);
				expect(testCommander.options[0]).toMatchObject({name: 's'});
				expect(testCommander.options[1]).toMatchObject({name: 'h'});
				expect(testCommander.options[2]).toMatchObject({name: 'o'});
				expect(testCommander.options[3]).toMatchObject({name: 'r'});
				expect(testCommander.options[4]).toMatchObject({name: 't'});
			}
		});
		
		it('should contain two long option', () => {
			const testCommander = new VCommandParser('!mycommand ~~long1 ~~long2', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(2);
				expect(testCommander.options[0]).toMatchObject({name: 'long1'});
				expect(testCommander.options[1]).toMatchObject({name: 'long2'});
			}
		});
		
		it('should contain three long option', () => {
			const testCommander = new VCommandParser('!mycommand ~~long1 ~~long2 ~~long3', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(3);
				expect(testCommander.options[0]).toMatchObject({name: 'long1'});
				expect(testCommander.options[1]).toMatchObject({name: 'long2'});
				expect(testCommander.options[2]).toMatchObject({name: 'long3'});
			}
		});
		
		it('should contain two short option', () => {
			const testCommander = new VCommandParser('!mycommand ~s ~h', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(2);
				expect(testCommander.options[0]).toMatchObject({name: 's'});
				expect(testCommander.options[1]).toMatchObject({name: 'h'});
			}
		});
		
		it('should contain three short option', () => {
			const testCommander = new VCommandParser('!mycommand ~s ~h ~o', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(3);
				expect(testCommander.options[0]).toMatchObject({name: 's'});
				expect(testCommander.options[1]).toMatchObject({name: 'h'});
				expect(testCommander.options[2]).toMatchObject({name: 'o'});
			}
		});
		
		it('should contain four short option, 2 stickied groups', () => {
			const testCommander = new VCommandParser('!mycommand ~sh ~or', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(4);
				expect(testCommander.options[0]).toMatchObject({name: 's'});
				expect(testCommander.options[1]).toMatchObject({name: 'h'});
				expect(testCommander.options[2]).toMatchObject({name: 'o'});
				expect(testCommander.options[3]).toMatchObject({name: 'r'});
			}
		});
	});
	
	describe('Messages with basic options and content', () => {
		it('should contain one long option', () => {
			const testCommander = new VCommandParser('!mycommand ~~long content', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(1);
				expect(testCommander.options[0]).toMatchObject({name: 'long', content: 'content'});
			}
		});
		
		it('should contain one short option', () => {
			const testCommander = new VCommandParser('!mycommand ~s content', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(1);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: 'content'});
			}
		});
		
		it('should contain two short option stickied', () => {
			const testCommander = new VCommandParser('!mycommand ~sh content', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(2);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: undefined});
				expect(testCommander.options[1]).toMatchObject({name: 'h', content: 'content'});
			}
		});
		
		it('should contain five short option stickied', () => {
			const testCommander = new VCommandParser('!mycommand ~short content', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(5);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: undefined});
				expect(testCommander.options[1]).toMatchObject({name: 'h', content: undefined});
				expect(testCommander.options[2]).toMatchObject({name: 'o', content: undefined});
				expect(testCommander.options[3]).toMatchObject({name: 'r', content: undefined});
				expect(testCommander.options[4]).toMatchObject({name: 't', content: 'content'});
			}
		});
		
		it('should contain two long option', () => {
			const testCommander = new VCommandParser('!mycommand ~~long1 content1 ~~long2 content2', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(2);
				expect(testCommander.options[0]).toMatchObject({name: 'long1', content: 'content1'});
				expect(testCommander.options[1]).toMatchObject({name: 'long2', content: 'content2'});
			}
		});
		
		it('should contain three long option', () => {
			const testCommander = new VCommandParser('!mycommand ~~long1 content1 ~~long2 content2 ~~long3 content3', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(3);
				expect(testCommander.options[0]).toMatchObject({name: 'long1', content: 'content1'});
				expect(testCommander.options[1]).toMatchObject({name: 'long2', content: 'content2'});
				expect(testCommander.options[2]).toMatchObject({name: 'long3', content: 'content3'});
			}
		});
		
		it('should contain three long option only one content', () => {
			const testCommander = new VCommandParser('!mycommand ~~long1 ~~long2 content ~~long3', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(3);
				expect(testCommander.options[0]).toMatchObject({name: 'long1', content: undefined});
				expect(testCommander.options[1]).toMatchObject({name: 'long2', content: 'content'});
				expect(testCommander.options[2]).toMatchObject({name: 'long3', content: undefined});
			}
		});
		
		it('should contain two short option', () => {
			const testCommander = new VCommandParser('!mycommand ~s content1 ~h content2', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(2);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: 'content1'});
				expect(testCommander.options[1]).toMatchObject({name: 'h', content: 'content2'});
			}
		});
		
		it('should contain three short option', () => {
			const testCommander = new VCommandParser('!mycommand ~s content1 ~h content2 ~o content3', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(3);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: 'content1'});
				expect(testCommander.options[1]).toMatchObject({name: 'h', content: 'content2'});
				expect(testCommander.options[2]).toMatchObject({name: 'o', content: 'content3'});
			}
		});
		
		it('should contain three short option only one content', () => {
			const testCommander = new VCommandParser('!mycommand ~s ~h content ~o', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(3);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: undefined});
				expect(testCommander.options[1]).toMatchObject({name: 'h', content: 'content'});
				expect(testCommander.options[2]).toMatchObject({name: 'o', content: undefined});
			}
		});
		
		it('should contain four short option, 2 stickied groups', () => {
			const testCommander = new VCommandParser('!mycommand ~sh content1 ~or content2', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(4);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: undefined});
				expect(testCommander.options[1]).toMatchObject({name: 'h', content: 'content1'});
				expect(testCommander.options[2]).toMatchObject({name: 'o', content: undefined});
				expect(testCommander.options[3]).toMatchObject({name: 'r', content: 'content2'});
			}
		});
	});
	
	describe('Messages with content and basic options and content', () => {
		it('should contain one long option', () => {
			const testCommander = new VCommandParser('!mycommand mycontent ~~long content', undefined, '~');
			
			expect(testCommander.content).toBe('mycontent');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(1);
				expect(testCommander.options[0]).toMatchObject({name: 'long', content: 'content'});
			}
		});
		
		it('should contain one long option and spaced content', () => {
			const testCommander = new VCommandParser('!mycommand my content ~~long content', undefined, '~');
			
			expect(testCommander.content).toBe('my content');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(1);
				expect(testCommander.options[0]).toMatchObject({name: 'long', content: 'content'});
			}
		});
		
		it('should contain one long option content after', () => {
			const testCommander = new VCommandParser('!mycommand ~~long content mycontent', undefined, '~');
			
			expect(testCommander.content).toBe('mycontent');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(1);
				expect(testCommander.options[0]).toMatchObject({name: 'long', content: 'content'});
			}
		});
		
		it('should contain one long option and spaced content after', () => {
			const testCommander = new VCommandParser('!mycommand ~~long content my content', undefined, '~');
			
			expect(testCommander.content).toBe('my content');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(1);
				expect(testCommander.options[0]).toMatchObject({name: 'long', content: 'content'});
			}
		});
		
		it('should contain one short option', () => {
			const testCommander = new VCommandParser('!mycommand mcontent ~s content', undefined, '~');
			
			expect(testCommander.content).toBe('mcontent');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(1);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: 'content'});
			}
		});
		
		it('should contain one short option and spaced content', () => {
			const testCommander = new VCommandParser('!mycommand my content ~s content', undefined, '~');
			
			expect(testCommander.content).toBe('my content');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(1);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: 'content'});
			}
		});
		
		it('should contain one short option after', () => {
			const testCommander = new VCommandParser('!mycommand ~s content mcontent', undefined, '~');
			
			expect(testCommander.content).toBe('mcontent');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(1);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: 'content'});
			}
		});
		
		it('should contain one short option and spaced content after', () => {
			const testCommander = new VCommandParser('!mycommand ~s content my content', undefined, '~');
			
			expect(testCommander.content).toBe('my content');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(1);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: 'content'});
			}
		});
		
		it('should contain two short option stickied', () => {
			const testCommander = new VCommandParser('!mycommand ~sh content', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(2);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: undefined});
				expect(testCommander.options[1]).toMatchObject({name: 'h', content: 'content'});
			}
		});
		
		it('should contain five short option stickied', () => {
			const testCommander = new VCommandParser('!mycommand ~short content', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(5);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: undefined});
				expect(testCommander.options[1]).toMatchObject({name: 'h', content: undefined});
				expect(testCommander.options[2]).toMatchObject({name: 'o', content: undefined});
				expect(testCommander.options[3]).toMatchObject({name: 'r', content: undefined});
				expect(testCommander.options[4]).toMatchObject({name: 't', content: 'content'});
			}
		});
		
		it('should contain two long option', () => {
			const testCommander = new VCommandParser('!mycommand ~~long1 content1 ~~long2 content2', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(2);
				expect(testCommander.options[0]).toMatchObject({name: 'long1', content: 'content1'});
				expect(testCommander.options[1]).toMatchObject({name: 'long2', content: 'content2'});
			}
		});
		
		it('should contain three long option', () => {
			const testCommander = new VCommandParser('!mycommand ~~long1 content1 ~~long2 content2 ~~long3 content3', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(3);
				expect(testCommander.options[0]).toMatchObject({name: 'long1', content: 'content1'});
				expect(testCommander.options[1]).toMatchObject({name: 'long2', content: 'content2'});
				expect(testCommander.options[2]).toMatchObject({name: 'long3', content: 'content3'});
			}
		});
		
		it('should contain three long option only one content', () => {
			const testCommander = new VCommandParser('!mycommand ~~long1 ~~long2 content ~~long3', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(3);
				expect(testCommander.options[0]).toMatchObject({name: 'long1', content: undefined});
				expect(testCommander.options[1]).toMatchObject({name: 'long2', content: 'content'});
				expect(testCommander.options[2]).toMatchObject({name: 'long3', content: undefined});
			}
		});
		
		it('should contain two short option', () => {
			const testCommander = new VCommandParser('!mycommand ~s content1 ~h content2', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(2);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: 'content1'});
				expect(testCommander.options[1]).toMatchObject({name: 'h', content: 'content2'});
			}
		});
		
		it('should contain three short option', () => {
			const testCommander = new VCommandParser('!mycommand ~s content1 ~h content2 ~o content3', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(3);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: 'content1'});
				expect(testCommander.options[1]).toMatchObject({name: 'h', content: 'content2'});
				expect(testCommander.options[2]).toMatchObject({name: 'o', content: 'content3'});
			}
		});
		
		it('should contain three short option only one content', () => {
			const testCommander = new VCommandParser('!mycommand ~s ~h content ~o', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(3);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: undefined});
				expect(testCommander.options[1]).toMatchObject({name: 'h', content: 'content'});
				expect(testCommander.options[2]).toMatchObject({name: 'o', content: undefined});
			}
		});
		
		it('should contain four short option, 2 stickied groups', () => {
			const testCommander = new VCommandParser('!mycommand ~sh content1 ~or content2', undefined, '~');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(4);
				expect(testCommander.options[0]).toMatchObject({name: 's', content: undefined});
				expect(testCommander.options[1]).toMatchObject({name: 'h', content: 'content1'});
				expect(testCommander.options[2]).toMatchObject({name: 'o', content: undefined});
				expect(testCommander.options[3]).toMatchObject({name: 'r', content: 'content2'});
			}
		});
	});
	
	describe('Messages with option stopper', () => {
		it('should contain content only', () => {
			const testCommander = new VCommandParser('!mycommand ~~ content', undefined, '~');
			
			expect(testCommander.content).toBe('content');
		});
		
		it('should contain both content only', () => {
			const testCommander = new VCommandParser('!mycommand my ~~ content', undefined, '~');
			
			expect(testCommander.content).toBe('my content');
		});
		
		it('should contain one long option and content', () => {
			const testCommander = new VCommandParser('!mycommand ~~long ~~ content', undefined, '~');
			
			expect(testCommander.content).toBe('content');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(1);
				expect(testCommander.options[0]).toMatchObject({name: 'long'});
			}
		});
		
		it('should contain one long option and option like content', () => {
			const testCommander = new VCommandParser('!mycommand ~~long ~~ ~~content', undefined, '~');
			
			expect(testCommander.content).toBe('~~content');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(1);
				expect(testCommander.options[0]).toMatchObject({name: 'long'});
			}
		});
		
		it('should contain one short option and content', () => {
			const testCommander = new VCommandParser('!mycommand ~s ~~ content', undefined, '~');
			
			expect(testCommander.content).toBe('content');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(1);
				expect(testCommander.options[0]).toMatchObject({name: 's'});
			}
		});
		
		it('should contain one short option and option like content', () => {
			const testCommander = new VCommandParser('!mycommand ~s ~~ ~~content', undefined, '~');
			
			expect(testCommander.content).toBe('~~content');
			
			expect(testCommander.options).toBeDefined();
			if (testCommander.options) {
				expect(testCommander.options.length).toBe(1);
				expect(testCommander.options[0]).toMatchObject({name: 's'});
			}
		});
		
		it('should contain stopper as content', () => {
			const testCommander = new VCommandParser('!mycommand "~~"', undefined, '~');
			
			expect(testCommander.content).toBe('~~');
		});
	});
});
