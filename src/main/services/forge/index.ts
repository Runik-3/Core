// service for handling any forge actions, including the editing of dictionaries

import { ipcMain } from 'electron';
import Parser from '../Parser';
import type Shelf from '../shelf';
import type { DictionaryObject } from '../../../typings/dictionaries/dictionary';

export default class Forge {
	shelf: Shelf;

	cachedDict?: DictionaryObject;

	constructor(shelf: Shelf) {
		this.shelf = shelf;
	}

	async init() {
		await this.listen();
	}

	async getDictionary(dictName: string) {
		if (this.cachedDict?.meta.name === dictName) {
			return this.cachedDict;
		}
		const dict = await this.shelf.getDictionaryContent(dictName);
		const parsedDefs = Parser.fromXdxf(dict);

		const parsedDict: DictionaryObject = {
			meta: { name: dictName },
			definitions: parsedDefs,
		};
		this.cachedDict = parsedDict;

		return parsedDict;
	}

	async listen() {
		ipcMain.handle('forgeGetDict', async (e, dictName: string) => {
			return this.getDictionary(dictName);
		});
	}
}
