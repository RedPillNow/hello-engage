import * as rpTypes from '../commons/types';
import {DataRequest} from '../commons/xhrRequest';
import * as utils from '../commons/utils';
import * as moment from 'moment';
import {Speaker} from '../models/speaker';

export class DataHelper {

	static fetchAllSessionsData() {
		let opts: rpTypes.XhrOptions = {
			method: 'GET',
			uri: 'https://firestore.googleapis.com/v1beta1/projects/hello-engage-69ff8/databases/(default)/documents/sesions',
			resolveFullResponse: true,
			json: true
		}
		return DataRequest.doRequest(opts);
	}
	/**
	 * Get sessions by speaker name
	 * @param {Speaker} speaker the speaker we want to lookup
	 */
	static fetchSessionsBySpeakerName(speaker: Speaker) {
		let body: any = {
			'structuredQuery': {
				'select': {
					'fields': [
						{'fieldPath': 'session_title'},
						{'fieldPath': 'session_date'},
						{'fieldPath': 'session_time1'},
						{'fieldPath': 'session_room'},
						{'fieldPath': '`$37`'},
						{'fieldPath': 'speaker_name'},
						{'fieldPath': 'speaker_org'},
						{'fieldPath': 'speaker_photourl'},
						{'fieldPath': 'speaker_logo'},
						{'fieldPath': 'speaker_profile'},
						{'fieldPath': 'speaker_name2'},
						{'fieldPath': 'speaker_org2'},
						{'fieldPath': 'speaker_photourl2'},
						{'fieldPath': 'speaker_logo2'},
						{'fieldPath': 'speaker_profile2'},
						{'fieldPath': 'speaker_name3'},
						{'fieldPath': 'speaker_org3'},
						{'fieldPath': 'speaker_photourl3'},
						{'fieldPath': 'speaker_logo3'},
						{'fieldPath': 'speaker_profile3'},
						{'fieldPath': 'speaker_name4'},
						{'fieldPath': 'speaker_org4'},
						{'fieldPath': 'speaker_photourl4'},
						{'fieldPath': 'speaker_logo4'},
						{'fieldPath': 'speaker_profile4'},
						{'fieldPath': 'speaker_name5'},
						{'fieldPath': 'speaker_photourl5'},
						{'fieldPath': 'speaker_logo5'},
						{'fieldPath': 'speaker_profile5'}
					]
				},
				'from': {
					'collectionId': 'sessions'
				},
				'where': {
					'fieldFilter': {
						'field': {
							'fieldPath': 'speaker_name'
						},
						'op': 'EQUAL',
						'value': {
							'stringValue': speaker.name
						}
					}
				}
			}
		};
		console.log('DataHelper.fetchSessionsBySpeakerName, body=', JSON.stringify(body));
		let opts: rpTypes.XhrOptions = {
			method: 'POST',
			uri: 'https://firestore.googleapis.com/v1beta1/projects/hello-engage-69ff8/databases/(default)/documents:runQuery',
			resolveFullResponse: true,
			json: true,
			body: body
		};
		return DataRequest.doRequest(opts);
	}
	/**
	 * Get the upcoming sessions
	 * @returns {Promise<any>}
	 */
	static fetchNextSessions() {
		console.log('DataHelper.fetchNextSessions');
		let now = new Date('5/22/2018 01:22 PM');
		let mom = moment(now);
		let dateOnlyValue = mom.format('YYYYMMDD');
		let nearestQuarter = utils.getNearestQuarterHour();
		mom.minute(nearestQuarter);
		let startTimeValue = mom.format('kk:mm');
		return DataHelper.fetchSessionsAtTime(startTimeValue);
	}
	/**
	 * Fetch the sessions happening in the next hour
	 * @param time a time to start with
	 */
	static fetchSessionsAtTime(time) {
		console.log('DataHelper.fetchSessionsAtTime', arguments);
		let now = new Date('5/22/2018 ' + time);
		let mom = moment(now);
		let dateOnlyValue = mom.format('YYYYMMDD');
		if (mom.hour() > 0 && mom.hour() < 8) {
			mom.hour(mom.hour() + 12);
		}
		let startTimeValue = mom.format('kk:mm');
		mom.minute(mom.minute() + 60);
		let untilTimeValue = mom.format('kk:mm');
		let body: any = {
			'structuredQuery': {
				'select': {
					'fields': [
						{'fieldPath': 'session_title'},
						{'fieldPath': 'session_date'},
						{'fieldPath': 'session_time1'},
						{'fieldPath': 'session_room'},
						{'fieldPath': '`$37`'},
						{'fieldPath': 'speaker_name'},
						{'fieldPath': 'speaker_org'},
						{'fieldPath': 'speaker_photourl'},
						{'fieldPath': 'speaker_logo'},
						{'fieldPath': 'speaker_profile'},
						{'fieldPath': 'speaker_name2'},
						{'fieldPath': 'speaker_org2'},
						{'fieldPath': 'speaker_photourl2'},
						{'fieldPath': 'speaker_logo2'},
						{'fieldPath': 'speaker_profile2'},
						{'fieldPath': 'speaker_name3'},
						{'fieldPath': 'speaker_org3'},
						{'fieldPath': 'speaker_photourl3'},
						{'fieldPath': 'speaker_logo3'},
						{'fieldPath': 'speaker_profile3'},
						{'fieldPath': 'speaker_name4'},
						{'fieldPath': 'speaker_org4'},
						{'fieldPath': 'speaker_photourl4'},
						{'fieldPath': 'speaker_logo4'},
						{'fieldPath': 'speaker_profile4'},
						{'fieldPath': 'speaker_name5'},
						{'fieldPath': 'speaker_photourl5'},
						{'fieldPath': 'speaker_logo5'},
						{'fieldPath': 'speaker_profile5'}
					]
				},
				'from': {
					'collectionId': 'sessions'
				},
				'where': {
					'compositeFilter': {
						'filters': [
							{
								'fieldFilter': {
									'field': {'fieldPath': 'session_date'},
									'op': 'EQUAL',
									'value': {'stringValue': dateOnlyValue}
								}
							},{
								'fieldFilter': {
									'field': {'fieldPath': 'session_time1'},
									'op': 'GREATER_THAN_OR_EQUAL',
									'value': {'stringValue': startTimeValue}
								}
							},{
								'fieldFilter': {
									'field': {'fieldPath': 'session_time1'},
									'op': 'LESS_THAN_OR_EQUAL',
									'value': {'stringValue': untilTimeValue}
								}
							}
						],
						'op': 'AND'
					}
				}
			}
		};
		console.log('DataHelper.fetchSessionsAtTime, body=', JSON.stringify(body));
		let opts: rpTypes.XhrOptions = {
			method: 'POST',
			uri: 'https://firestore.googleapis.com/v1beta1/projects/hello-engage-69ff8/databases/(default)/documents:runQuery',
			resolveFullResponse: true,
			json: true,
			body: body
		};
		return DataRequest.doRequest(opts);
	}
	/**
	 * Get all the upcoming sessions for today that are happening the requested room
	 * @param room the room we're looking for. Should be formatted like "A. Theatre". Should actually be
	 * a room determined by utils.getDbRoom
	 * @see utils.getDbRoom
	 */
	static fetchSessionsByRoom(room) {
		console.log('DataHelper.fetchSessionsByRoom', arguments);
		let now = new Date('5/22/2018 1:00 PM');
		let mom = moment(now);
		let dateOnlyValue = mom.format('YYYYMMDD');
		let startTimeValue = mom.format('kk:mm');
		let body: any = {
			'structuredQuery': {
				'select': {
					'fields': [
						{'fieldPath': 'session_title'},
						{'fieldPath': 'session_date'},
						{'fieldPath': 'session_time1'},
						{'fieldPath': 'session_room'},
						{'fieldPath': '`$37`'},
						{'fieldPath': 'speaker_name'},
						{'fieldPath': 'speaker_org'},
						{'fieldPath': 'speaker_photourl'},
						{'fieldPath': 'speaker_logo'},
						{'fieldPath': 'speaker_profile'},
						{'fieldPath': 'speaker_name2'},
						{'fieldPath': 'speaker_org2'},
						{'fieldPath': 'speaker_photourl2'},
						{'fieldPath': 'speaker_logo2'},
						{'fieldPath': 'speaker_profile2'},
						{'fieldPath': 'speaker_name3'},
						{'fieldPath': 'speaker_org3'},
						{'fieldPath': 'speaker_photourl3'},
						{'fieldPath': 'speaker_logo3'},
						{'fieldPath': 'speaker_profile3'},
						{'fieldPath': 'speaker_name4'},
						{'fieldPath': 'speaker_org4'},
						{'fieldPath': 'speaker_photourl4'},
						{'fieldPath': 'speaker_logo4'},
						{'fieldPath': 'speaker_profile4'},
						{'fieldPath': 'speaker_name5'},
						{'fieldPath': 'speaker_photourl5'},
						{'fieldPath': 'speaker_logo5'},
						{'fieldPath': 'speaker_profile5'}
					]
				},
				'from': {
					'collectionId': 'sessions'
				},
				'where': {
					'compositeFilter': {
						'filters': [
							{
								'fieldFilter': {
									'field': {'fieldPath': 'session_room'},
									'op': 'EQUAL',
									'value': {'stringValue': room}
								}
							},{
								'fieldFilter': {
									'field': {'fieldPath': 'session_date'},
									'op': 'EQUAL',
									'value': {'stringValue': dateOnlyValue}
								}
							},{
								'fieldFilter': {
									'field': {'fieldPath': 'session_time1'},
									'op': 'GREATER_THAN_OR_EQUAL',
									'value': {'stringValue': startTimeValue}
								}
							}
						],
						'op': 'AND'
					}
				}
			}
		};
		console.log('DataHelper.fetchSessionsByRoom, body=', JSON.stringify(body));
		let opts: rpTypes.XhrOptions = {
			method: 'POST',
			uri: 'https://firestore.googleapis.com/v1beta1/projects/hello-engage-69ff8/databases/(default)/documents:runQuery',
			resolveFullResponse: true,
			json: true,
			body: body
		};
		return DataRequest.doRequest(opts);
	}
	/**
	 * Query firebase for sessions based on the values given in slots
	 * @param {any} sessions The sessions JSON object
	 * @param {any} slots The values in the slots
	 * @property {string} slots.AMAZON.TIME The time from a request
	 * @property {string} slots.AMAZON.Room The room name from a request
	 * @property {string} slots.SessionName The name of a session from a request
	 * @property {string} slots.AMAZON.Person The name of a presenter from a request
	 * @returns {Session[]}
	 */
	static findSessions(slots: any): Promise<any> {
		console.log('ResponseGenerator.findSessions, slots=', slots);
		if (slots) {
			if (slots['AMAZON.Person']) {
				let speaker = new Speaker();
				speaker.name = utils.toTitleCase(slots['AMAZON.Person']);
				return DataHelper.fetchSessionsBySpeakerName(speaker);
			}
			if (slots['AMAZON.TIME']) {
				return DataHelper.fetchSessionsAtTime(slots['AMAZON.TIME']);
			}
			if (slots['AMAZON.Room']) {
				let room = utils.getDbRoom(slots['AMAZON.Room']);
				return DataHelper.fetchSessionsByRoom(room);
			}
			if (slots['SessionName']) {

			}
		} else {
			return DataHelper.fetchNextSessions();
		}
		return null;
	}
	/**
	 * Get the spoken date like 'Tomorrow at 1:30 PM'
	 * @param {string} dateTimeStr a dateTime String
	 * @param {string} refDate a reference date (i.e. what session date should we mimick)
	 */
	static getSpokenDateText(dateTimeStr, refDate?) {
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
	static getPrintedDateText(dateTimeStr, refDate?) {
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

}
