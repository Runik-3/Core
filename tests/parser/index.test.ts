import Parser from '../../src/main/services/Parser/index';

describe('Parser', () => {
	test('Sanitize XDXF string.', () => {
		const xdxfText = `<ar><k>Abessiniër</k>
Abyssinian</ar>
<ar><k>Achilles</k>
Achilles</ar>`;
		const parsedText = Parser.sanitizeXdxf(xdxfText);
		expect(parsedText).toBe(
			'<ar><k>Abessiniër</k>Abyssinian</ar><ar><k>Achilles</k>Achilles</ar>',
		);
	});

	test('Parse words and definitions and return javascript object.', () => {
		const xdxfText =
			'<ar><k>Afrika</k>Africa</ar><ar><k>Afrikaan</k>African</ar>';
		const parsedText = Parser.fromXdxf(xdxfText);
		expect(parsedText).toEqual({
			Afrika: 'Africa',
			Afrikaan: 'African',
		});
	});

	test('Parse around other XML tags.', () => {
		const xdxfText = `<?xml version="1.0" encoding="UTF-8" ?>
		<!DOCTYPE xdxf SYSTEM "http://xdxf.sourceforge.net/xdxf_lousy.dtd">
		<xdxf lang_from="AFR" lang_to="ENG" format="visual">
		<full_name>Afrikaans-English dictionary</full_name>
		<description>Copyright: Converted by swaj under GNU Public License; Version: 1.1</description>
		<ar><k>Abessiniër</k>
		Abyssinian</ar>
		<ar><k>Achilles</k>
		Achilles</ar>`;
		const parsedText = Parser.fromXdxf(xdxfText);
		expect(parsedText).toEqual({
			Abessiniër: 'Abyssinian',
			Achilles: 'Achilles',
		});
	});
});
