// service for handling any forge actions, including the editing of dictionaries

import { ipcMain } from 'electron';
import Parser from '../Parser';
import type Shelf from '../shelf';

export default class Forge {
	shelf: Shelf;

	constructor(shelf: Shelf) {
		this.shelf = shelf;
	}

	async init() {
		await this.listen();
	}

	async getParsedDictionaryObject(dictName: string) {
		const dict = await this.shelf.getDictionaryContent(dictName);
		const parsedDict = Parser.fromXdxf(dict);
		console.log(parsedDict);
		return parsedDict;
	}

	async listen() {
		ipcMain.handle('forgeGetDict', async (e, dictName: string) => {
			return this.getParsedDictionaryObject(dictName);
		});
	}
}
