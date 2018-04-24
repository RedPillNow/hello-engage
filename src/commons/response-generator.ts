import * as Alexa from 'ask-sdk-core';
import { IntentRequest, Slot } from 'ask-sdk-model';
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

	static getSessionsResponse(handlerInput: Alexa.HandlerInput) {
		let vals = utils.getSlotValues((<IntentRequest> handlerInput.requestEnvelope.request).intent.slots);

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
			console.log('ResponseGenerator.getSessionsResponse, sessions=', sessions);
		});
		return {
			textContent: new Alexa.PlainTextContentHelper()
				.withPrimaryText('Not yet implemented. We\'re working on it, settle your jets')
				.getTextContent(),
			cardTitle: 'Not yet implemented'
		};
	}

}
