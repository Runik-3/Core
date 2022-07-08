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
		selectedDictionary: {},
	}),
	getters: {
		getSelectedDictionary: state => state.selectedDictionary,
	},
	actions: {
		setSelectedDictionary(selectedDict: DictionaryObject) {
			this.selectedDictionary = selectedDict;
		},

		updateDefinition(oldRecord: Definition, newRecord: Definition) {
			if (Object.keys(oldRecord)[0] === Object.keys(newRecord)[0]) {
				console.log('matching');
			}
		},
	},
});
