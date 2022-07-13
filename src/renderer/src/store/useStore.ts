/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import { defineStore } from 'pinia';
import type {
	Definition,
	DictionaryObject,
} from '../../../typings/dictionaries/dictionary';

export const useStore = defineStore({
	id: 'Library',
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

		isDefined() {
			if (this.selectedDictionary?.meta?.name) {
				return true;
			}
			return false;
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
