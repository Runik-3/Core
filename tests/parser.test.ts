import Parser from '../src/main/services/Parser/index';

describe('Parser', () => {
	test('Parse words and definitions and return javascript object.', () => {
		const xdxfText =
			'<ar><k>Afrika</k>Africa</ar><ar><k>Afrikaan</k>African</ar>';
		const parsedText = Parser.fromXdxf(xdxfText);
		expect(parsedText).toEqual({
			Afrika: 'Africa',
			Afrikaan: 'African',
		});
	});
});
