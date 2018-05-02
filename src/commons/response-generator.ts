import * as Alexa from 'ask-sdk-core';
import * as rpTypes from './types';
import {Session} from '../models/session';

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
			'Hi, Welcome to Engage 2018. Enjoy the conference',
			'Howdy! This is "Hello Engage"! I can help you find sessions to attend, give me a try.',
			'Hola! ¡Esto es hola participar! Disfruta la conferencia',
			'Hej! Dette er hej engagere! Nyd konferencen',
			'Bu merhaba meşgul! Konferansın tadını çıkar',
			'Hallå! Detta är hej engagera! Njut av konferensen'
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

	static get yesResponse(): rpTypes.TextResponse {
		return {
			textContent: new Alexa.PlainTextContentHelper()
				.withPrimaryText('Excellent! Enjoy the session')
				.getTextContent(),
			cardTitle: 'Excellent! Enjoy the session'
		};
	}

	static get noSessionsResponse(): rpTypes.TextResponse {
		return {
			textContent: new Alexa.PlainTextContentHelper()
				.withPrimaryText('I don\'t have any sessions, please try again')
				.getTextContent(),
			cardTitle: 'I don\'t have any sessions, please try again',
			cardText: 'I didn\'t find any sessions'
		};
	}

	static getSessionsResp(foundSessions: any[], lastIdx: number): rpTypes.TextResponse {
		console.log('ResponseGenerator.getSessionsResp, lastIdx=', lastIdx);
		if (foundSessions && foundSessions.length > 0) {
			let nextIdx = lastIdx + 1;
			let sess: Session = null;
			if (foundSessions[nextIdx] instanceof Session) {
				console.log('ResponseGenerator.getSessionsResp, got a Session');
				sess = foundSessions[nextIdx];
			}else {
				console.log('ResponseGenerator.getSessionsResp, create a Session');
				let apiObj = foundSessions[nextIdx]._apiObj ? foundSessions[nextIdx]._apiObj : foundSessions[nextIdx];
				sess = new Session(apiObj);
			}
			console.log('ResponseGenerator.getSessionsResp, sess=', JSON.stringify(sess));
			let primaryText = sess.spokenTitle;
			primaryText += ' by ' + sess.spokenSpeakers;
			primaryText += ', in the ' + sess.spokenRoom;
			primaryText += ', ' + sess.spokenDate + '.';
			primaryText += ' Is this the one you\'re looking for?';
			let cardText = sess.sessionTitle;
			cardText += ' by ' + sess.spokenSpeakers;
			cardText += ', in the ' + sess.sessionRoom;
			cardText += ', ' + sess.cardDate + '.';
			cardText += ' Is this the one you\'re looking for?';
			let resp = {
				textContent: new Alexa.PlainTextContentHelper()
					.withPrimaryText(primaryText)
					.getTextContent(),
				cardTitle: sess.sessionTitle.replace('&', 'and'),
				cardText: cardText
			};
			console.log('ResponseGenerator.getSessionsResp, resp=', resp);
			return resp;
		}else {
			return {
				textContent: new Alexa.PlainTextContentHelper()
					.withPrimaryText('We didn\'t find any sessions that match your request. Please try again.')
					.getTextContent(),
				cardTitle: 'Don\'t shoot the messenger, but we couldn\'t find any sessions'
			}
		}
	}

	static getNoResponse(foundSessions, lastIdx): rpTypes.TextResponse {
		console.log('ResponseGenerator.getNoResponse', arguments);
		return ResponseGenerator.getSessionsResp(foundSessions, lastIdx);
	}
}
