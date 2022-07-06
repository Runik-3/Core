// parses xdxf files into workable/editable objects

export default class Parser {
	static fromXdxf(dictContents: string) {
		// <ar><k>Afrika</k>Africa</ar>
		const parsedDefinitions: { [key: string]: string } = {};

		const definitions = Array.from(
			dictContents.matchAll(/(<ar>).*?(<\/ar>)/gi),
		);

		definitions.forEach(def => {
			let word = Array.from(def[0].matchAll(/(<k>).*?(<\/k>)/gi))[0][0];
			let definition = Array.from(
				def[0].matchAll(/(<\/k>).*?(<\/ar>)/gi),
			)[0][0];

			word = this.sanitizeTags(word);
			definition = this.sanitizeTags(definition);

			parsedDefinitions[word] = definition;
		});
		return parsedDefinitions;
	}

	static sanitizeTags(dirtyText: string) {
		let text = dirtyText;
		const tags = Array.from(text.matchAll(/<.*?>/gi));
		tags.forEach(tag => {
			text = text.replace(tag[0], '');
		});
		console.log(text);
		return text;
	}
}
