import * as Alexa from 'ask-sdk-core';
import * as rpTypes from './types';
import * as utils from './utils';
import {DataHelper} from '../data/dataHelper'

export class ResponseGenerator {

	static get launchResponse(): rpTypes.TextResponse {
		return {
			textContent: new Alexa.PlainTextContentHelper()
				.withPrimaryText('Welcome to Hello Engage, Ask me to find sessions for Engage 2018')
				.getTextContent(),
			cardTitle: 'Welcome to Hello Engage'
		};
	}

	static get generalGreetingResponse(): rpTypes.TextResponse {
		const greetingArr = [
			'Hello, Thank you for trying "Hello Engage" from Red Pill Now.',
			'Hello, Welcome to Engage 2018. Enjoy the conference',
			'Howdy! This is "Hello Engage"! I can help you find sessions to attend, give me a try.'
		]
		let msg = greetingArr[Math.floor(Math.random() * greetingArr.length)];
		return {
			textContent: new Alexa.PlainTextContentHelper()
				.withPrimaryText(msg)
				.getTextContent(),
			cardTitle: 'Hello from Hello Engage'
		};
	}

	static get cancelStopResponse(): rpTypes.TextResponse {
		return {
			textContent: new Alexa.PlainTextContentHelper()
				.withPrimaryText('Goodbye! Thank you for trying "Hello Engage"')
				.getTextContent(),
			cardTitle: 'Thank you, Goodbye!'
		};
	}

	static get helpResponse(): rpTypes.TextResponse {
		return {
			textContent: new Alexa.PlainTextContentHelper()
				.withPrimaryText('Ask me to find sessions by time, person or room name.')
				.withSecondaryText('For Example: get sessions by Jason Gary.')
				.withTertiaryText('Get today\'s sessions')
				.getTextContent(),
			cardTitle: 'Hello Engage Help'
		};
	}

	static getSessions(handlerInput): Promise<any[]> {
		return new Promise((resolve, reject) => {
			DataHelper.getSessionsData()
				.then((response: rpTypes.ViewData) => {
					let entries = response.viewentry;
					let sessions: rpTypes.Session[] = entries.map((ent: rpTypes.ViewEntry, idx, arr) => {
						return {
							title: DataHelper.getEntryValue(ent, 'session_title'),
							datetime: DataHelper.getEntryValue(ent, 'session_date'),
							room: DataHelper.getEntryValue(ent, 'session_room'),
							abstract: DataHelper.getEntryValue(ent, '$37'),
							speakers: null
						} as rpTypes.Session;
					});
					resolve(entries);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	static getSessionsResp(sessions: any[], slots): rpTypes.Session[] {
		if (slots) {
			let time = slots['AMAZON.TIME'];
			let speaker = slots['AMAZON.Person'];
			let room = slots['AMAZON.Room'];
			let title = slots['SessionName'];
			let engSessions = sessions.filter((sess, idx, arr) => {
				let sessSpeaker = DataHelper.getEntryValue(sess, 'speaker_name');
				console.log('ResponseGenerator.getSessionsResp, sessSpeaker', sessSpeaker);
				let sessRoom = DataHelper.getEntryValue(sess, 'session_room');
				let sessTime = DataHelper.getEntryValue(sess, 'session_date');
				let sessTitle = DataHelper.getEntryValue(sess, 'session_title');
				let returnVal = false;
				if (speaker && sessSpeaker && (speaker.toLowerCase() === sessSpeaker.toLowerCase() || sessSpeaker.indexOf(speaker.toLowerCase()) > -1)) {
					returnVal = true;
				}
				if (time && sessTime && time === sessTime) {
					returnVal = true;
				}
				if (room && sessRoom && (room.toLowerCase() === sessRoom.toLowerCase() || sessRoom.indexOf(room) > -1)) {
					returnVal = true;
				}
				if (title && sessTitle && (title.toLowerCase() === sessTitle.toLowerCase() || sessTitle.indexOf(title) > -1)) {
					returnVal = true;
				}
				return returnVal;
			});
			console.log('ResponseGenerator.getSessionsResp, engSessions=', engSessions);
			if (engSessions && engSessions.length > 0) {
				let rpSessions = engSessions.map((sess, idx, arr) => {
					return {
						title: DataHelper.getEntryValue(sess, 'session_title'),
						speakers: [],
						datetime: DataHelper.getEntryValue(sess, 'session_date'),
						room: DataHelper.getEntryValue(sess, 'session_room'),
						abstract: DataHelper.getEntryValue(sess, '$37'),
						spoken: {
							title: DataHelper.getEntryValue(sess, '', true),
							speakers: [],
							datetime: DataHelper.getEntryValue(sess, '', true),
							room: DataHelper.getEntryValue(sess, '', true),
							abstract: DataHelper.getEntryValue(sess, '$37', true)
						}
					} as rpTypes.Session;
				});
				return rpSessions;
			}
		}
		return null;
	}

}
