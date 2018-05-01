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

export function isResponseValid(response) {
	if (!response) {
		return false;
	} else if (response && Array.isArray(response)) {
		return response.length > 0 && response[0].document ? true : false;
	}
	return true;
}

export function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
