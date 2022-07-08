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
			this.selectedDictionary.definitions.delete(oldRecord.word);
			this.selectedDictionary.definitions.set(
				newRecord.word,
				newRecord.definition,
			);
		},

		alphabetizeDefinitions() {
			//
		},
	},
});
