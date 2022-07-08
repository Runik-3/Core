/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import { defineStore } from 'pinia';

export const useStore = defineStore({
	id: 'counter',
	state: () => ({
		counter: 0,
	}),
	getters: {
		doubleCount: state => state,
	},
	actions: {
		increment() {
			this.counter++;
		},
	},
});
