import * as Alexa from 'ask-sdk-core';
import { Slot } from 'ask-sdk-model';
import * as rpTypes from './types';
/**
 * Get the valid slot values
 * @param slots the object of slots provided in the handlerInput
 * @returns {any}
 */
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
/**
 * Determine if a response is valid or not. Even when there
 * are no records returned from firebase there is an array with
 * one object in it with just a readtime
 * @param {any[]} response The response from firebase
 * @returns {boolean}
 */
export function isResponseValid(response): boolean {
	if (!response) {
		return false;
	} else if (response && Array.isArray(response)) {
		return response.length > 0 && response[0].document ? true : false;
	}
	return true;
}
/**
 * Convert a string to proper case, used mainly for names
 * @param {string} str
 * @returns {string}
 */
export function toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
/**
 * The the nearest quarter hour based on the current time
 * @returns {string}
 */
export function getNearestQuarterHour(): number {
	let now = new Date();
	let minutes = now.getMinutes();
	if (minutes < 7) {
		minutes = 0;
	}else if (minutes < 22) {
		minutes = 15;
	}else if (minutes < 37) {
		minutes = 30;
	}else if (minutes < 52) {
		minutes = 45;
	}else {
		minutes = 0;
	}
	return minutes;
}
/**
 * Get the value to search firebase for the room
 * @param roomSlotValue The spoken room name
 * @returns {string}
 */
export function getDbRoom(roomSlotValue: string): string {
	let returnVal = null;
	if (roomSlotValue.toLowerCase() === 'honolulu') {
		returnVal = 'Table 2 Honolulu';
	}else if (roomSlotValue.toLowerCase() === 'guadaloupe') {
		returnVal = 'B. Guadaloupe';
	}else if (roomSlotValue.toLowerCase() === 'theater') {
		returnVal = 'A. Theatre';
	}else if (roomSlotValue.toLowerCase() === 'sky room') {
		returnVal = 'E. Sky Room';
	}else if (roomSlotValue.toLowerCase() === 'sun room') {
		returnVal = 'D. Sun Room';
	}else if (roomSlotValue.toLowerCase() === 'vancouver') {
		returnVal = 'Table 1 Vancouver';
	}else if (roomSlotValue.toLowerCase() === 'trinidad') {
		returnVal = 'C. Trinidad';
	}else if (roomSlotValue.toLowerCase() === 'sponsor' || roomSlotValue.toLowerCase() === 'showroom' || roomSlotValue.toLowerCase() === 'floor') {
		returnVal = 'Sponsor Area';
	}
	return returnVal;
}
