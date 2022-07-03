// service for managing user's dictionary library
import path from 'path';
import { app } from 'electron';
import { existsSync, promises as fs } from 'fs';

export default class Shelf {
	// pull from config?
	private _dictPath = path.join(app.getPath('documents'), 'Runik');

	private _library?: Array<string> = ['fart'];

	constructor() {
		const existsLibraryPath = existsSync(this._dictPath);
		if (!existsLibraryPath) fs.mkdir(this._dictPath);
		this.loadLibrary();
	}

	async loadLibrary() {
		const localDictionaries = await fs.readdir(this._dictPath);
		this._library = [...localDictionaries];
		console.log(this._library);
	}
}
