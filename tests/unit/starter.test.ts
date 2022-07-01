import add from './add';

describe('Add', () => {
	it('Should add two positive numbers', () => {
		expect(add(1, 2)).toEqual(3);
	});
});
