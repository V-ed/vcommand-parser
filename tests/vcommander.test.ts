import { VCommander } from '../src/vcommander';

describe('Temporary testing', () => {
	it('should return test', () => {
		const testCommander = new VCommander('\\thx', '\\');
		
		expect(testCommander.command).toBe('thx');
	});
});
