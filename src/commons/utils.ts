import { Slot } from 'ask-sdk-model';
import * as rpTypes from './types';
import * as moment from 'moment';
import * as rp from 'request-promise';

/**
 * Perform an xhrRequest
 * @param options The xhrOptions to peform an xhr request
 * @returns {Promise<any>}
 */
export function doRequest(options: rpTypes.XhrOptions): Promise<any> {
	options.json = options.json == null || options.json === undefined ? true : options.json;
	options.method = options.method || 'GET';
	options.headers = options.headers || {};
	options.resolveFullResponse = options.resolveFullResponse === null || options.resolveFullResponse === undefined ? true : options.resolveFullResponse;
	if (options.userName && options.password && !options.headers.Authorization) {
		options.headers.Authorization = 'Basic a2VpdGggc3RyaWNrbGFuZDp0ZXN0MTIz';
		options.headers['User-Agent'] = options.headers['User-Agent'] ? options.headers['User-Agent'] : 'Request-Promise';
	}
	return rp(options);
}
/**
 * Get the valid slot values
 * @param slots the object of slots provided in the handlerInput
 * @returns {any}
 * @todo: need to make this a little more robust instead of assuming different things are
 * actually there
 */
export function getSlotValues(slots) {
	let returnVal = null;
	if (slots) {
		for (let key in slots) {
			let slot: Slot = slots[key];
			if (slot.value && !slot.resolutions) {
				returnVal = returnVal || {};
				returnVal[slot.name] = slot.value;
			}else if (slot.value && slot.resolutions) {
				returnVal = returnVal || {};
				if (slot.resolutions.resolutionsPerAuthority && slot.resolutions.resolutionsPerAuthority.length > 0) {
					if (slot.resolutions.resolutionsPerAuthority[0] && slot.resolutions.resolutionsPerAuthority[0].values && slot.resolutions.resolutionsPerAuthority[0].values.length > 0) {

						returnVal[slot.name] = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
					}else {
						returnVal[slot.name] = slot.value;
					}
				}else {
					returnVal[slot.name] = slot.value;
				}
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
		returnVal = 'A. Theater';
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
/**
 * Get the spoken date like 'Tomorrow at 1:30 PM'
 * @param {string} dateTimeStr a dateTime String
 * @param {string} refDate a reference date (i.e. what session date should we mimick)
 */
export function getSpokenDateText(dateTimeStr, refDate?) {
	console.log('DataHelper.getSpokenDateText, dateTimeStr=', dateTimeStr);
	let evtMoment: moment.Moment = moment(dateTimeStr);
	let evtCal = evtMoment.calendar();
	if (refDate) {
		evtCal = evtMoment.calendar(refDate)
	}
	console.log('DataHelper.getSpokenDateText, evtCal=', evtCal);
	let dateTimeArr = evtCal.split(' ');
	dateTimeArr.splice(2, 0, '<say-as interpret-as="time">');
	dateTimeArr.push('</say-as>');
	let dateTimeText = dateTimeArr.join(' ');
	console.log('DataHelper.getSpokenDateText returning', dateTimeText);
	return dateTimeText;
}
/**
 * Similar to getSpokenDateText however we don't include the "say-as" tag
 * @param dateTimeStr a dateTime string
 * @param refDate a reference date (i.e. what session date should we mimick)
 */
export function getPrintedDateText(dateTimeStr, refDate?) {
	console.log('DataHelper.getPrinteDateText, dateTimeStr=', dateTimeStr);
	let evtMoment: moment.Moment = moment(dateTimeStr);
	let evtCal = evtMoment.calendar();
	if (refDate) {
		evtCal = evtMoment.calendar(refDate)
	}
	console.log('DataHelper.getDateText, evtCal=', evtCal);
	let dateTimeArr = evtCal.split(' ');
	let dateTimeText = dateTimeArr.join(' ');
	console.log('DataHelper.getPrinteDateText returning', dateTimeText);
	return dateTimeText;
}
