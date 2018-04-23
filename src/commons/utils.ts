import * as Alexa from 'ask-sdk-core';
import { Slot } from 'ask-sdk-model';
import * as rpTypes from './types';

export function getSlotValues(slots) {
	let returnVal = null;
	if (slots) {
		for (let key in slots) {
			let slot: Slot = slots[key];
			if (slot.value) {
				returnVal = returnVal || {};
				returnVal[slot.name] = slot.value;
			}
		}
	}
	return returnVal;
}
