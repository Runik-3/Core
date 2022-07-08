// service for managing user's dictionary library
import path from 'path';
import { app, ipcMain } from 'electron';
import { existsSync, promises as fs } from 'fs';

export default class Shelf {
	// pull from config?
	private _dictPath = path.join(app.getPath('documents'), 'Runik');

	private _library?: Array<string> = ['fart'];

	async init() {
		const existsLibraryPath = existsSync(this._dictPath);
		if (!existsLibraryPath) fs.mkdir(this._dictPath);
		await this.loadLibrary();
		await this.listen();
	}

	async loadLibrary() {
		const localDictionaries = await fs.readdir(this._dictPath);
		this._library = [...localDictionaries];
		console.log(this._library);
	}

	async getDictionaryContent(dictName: string) {
		const dictionaryPath = path.join(this._dictPath, dictName);
		const dictContents = await fs.readFile(dictionaryPath, 'utf-8');
		return dictContents;
	}

	async listen() {
		ipcMain.handle('getLibrary', async () => {
			return this._library;
		});
	}
}
