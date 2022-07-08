/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import { defineStore } from 'pinia';
import type {
	Definition,
	DictionaryObject,
} from '../../../typings/dictionaries/dictionary';

export const useStore = defineStore({
	id: 'counter',
	state: () => ({
		selectedDictionary: {} as DictionaryObject,
	}),
	getters: {
		getSelectedDictionary: state => state.selectedDictionary,
	},
	actions: {
		setSelectedDictionary(selectedDict: DictionaryObject) {
			this.selectedDictionary = selectedDict;
		},

		updateDefinition(
			dictName: string,
			oldRecord: Definition,
			newRecord: Definition,
		) {
			const oldKey = Object.keys(oldRecord)[0];
			const newKey = Object.keys(newRecord)[0];

			if (oldKey === newKey) {
				this.selectedDictionary[dictName][newKey] = newRecord[newKey];
				return;
			}
			this.selectedDictionary[dictName][newKey] = newRecord[newKey];
			delete this.selectedDictionary[dictName][oldKey];
			console.log(this.selectedDictionary);
		},

		alphabetizeDefinitions() {
			//
		},
	},
});
