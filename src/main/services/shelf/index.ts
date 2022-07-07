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
		const localDictionaries = (await fs.readdir(this._dictPath)).filter(
			dict => {
				return dict.toLowerCase().includes('.xdxf');
			},
		);
		this._library = [...localDictionaries];
		console.log(this._library);
	}

	// new library entry

	async getDictionaryContent(dictName: string): Promise<string> {
		const dictionaryPath = path.join(this._dictPath, dictName);
		try {
			return await fs.readFile(dictionaryPath, 'utf-8');
		} catch {
			throw new Error('Unable to read dictionary contents.');
		}
	}

	async writeDictionaryContent(dictName: string, data: string) {
		const dictionaryPath = path.join(this._dictPath, dictName);
		try {
			await fs.writeFile(dictionaryPath, data, 'utf-8');
			return true;
		} catch (error) {
			return error;
		}
	}

	async listen() {
		ipcMain.handle('getLibrary', async () => {
			return this._library;
		});
	}
}
