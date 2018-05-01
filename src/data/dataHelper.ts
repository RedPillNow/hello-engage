import * as rpTypes from '../commons/types';
import {DataRequest} from '../commons/xhrRequest';
import * as utils from '../commons/utils';
import * as moment from 'moment';
import {Speaker} from '../models/speaker';

export class DataHelper {

	static getAllSessionsData() {
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
	static getSessionsBySpeakerName(speaker: Speaker) {
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
		console.log('DataHelper.getSessionsBySpeakerName, body=', JSON.stringify(body));
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
	 *
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
				return DataHelper.getSessionsBySpeakerName(speaker);
			}
		} else {

		}
		return null;
	}

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
