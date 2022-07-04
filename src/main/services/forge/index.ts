// service for handling any forge actions, including the editing of dictionaries

import { ipcMain } from 'electron';
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
		const dictData = await this.shelf.getDictionaryContent(dictName);
		// xdxf parser logic
		console.log(dictData);
		return dictData;
	}

	async listen() {
		ipcMain.handle('forgeGetDict', async (e, dictName: string) => {
			return this.getParsedDictionaryObject(dictName);
		});
	}
}
