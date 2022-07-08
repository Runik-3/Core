// parses xdxf files into workable/editable objects

export default class Parser {
	static fromXdxf(dictContents: string) {
		const parsedDefinitions = new Map<string, string>();

		const sanitizedString = Parser.sanitizeXdxf(dictContents);

		const definitions = Array.from(
			sanitizedString.matchAll(/(<ar>).*?(<\/ar>)/gi),
		);

		definitions.forEach(def => {
			let word = Array.from(def[0].matchAll(/(<k>).*?(<\/k>)/gi))[0][0];
			let definition = Array.from(
				def[0].matchAll(/(<\/k>).*?(<\/ar>)/gi),
			)[0][0];

			word = this.removeXdxfDefinitionTags(word);
			definition = this.removeXdxfDefinitionTags(definition);
			parsedDefinitions.set(word, definition);
		});
		return parsedDefinitions;
	}

	static sanitizeXdxf(unsanitizedXdxf: string) {
		return unsanitizedXdxf.replace(/(\n|\t)/g, '').trim();
	}

	static removeXdxfDefinitionTags(dirtyText: string) {
		let text = dirtyText;
		const tags = Array.from(text.matchAll(/<.*?>/gi));
		tags.forEach(tag => {
			text = text.replace(tag[0], '');
		});
		return text;
	}
}
