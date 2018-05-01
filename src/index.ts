import * as Alexa from 'ask-sdk-core';
import { Response, IntentRequest, Slot } from 'ask-sdk-model';
import * as rpTypes from './commons/types';
import {ResponseGenerator} from './commons/response-generator';
import * as utils from './commons/utils';
import {Session} from './models/session';
import { DataHelper } from './data/dataHelper';

const APP_ID = 'amzn1.ask.skill.6ae3d277-34f5-43c1-a52c-08b318becb16';

/**
 * Fired when the skill is launched
 */
const LaunchRequestHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		let sessAttrs = handlerInput.attributesManager.getSessionAttributes();
		let resp = ResponseGenerator.launchResponse;
		const speechText = resp.textContent.primaryText.text;
		sessAttrs.speechOutput = speechText;
		handlerInput.attributesManager.setSessionAttributes(sessAttrs);

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.withSimpleCard(resp.cardTitle, speechText)
			.getResponse();
	}
};
/**
 * GeneralGreetingIntent handler. Will respond with a random greeting
 */
const GeneralGreetingIntentHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'GeneralGreetingIntent';
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		let sessAttrs = handlerInput.attributesManager.getSessionAttributes();
		let resp = ResponseGenerator.generalGreetingResponse;
		const speechText = resp.textContent.primaryText.text;

		sessAttrs.speechOutput = speechText;
		handlerInput.attributesManager.setSessionAttributes(sessAttrs);
		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard(resp.cardTitle, speechText)
			.getResponse();
	}
};

const SessionsRequestInterceptor = {
	process(handlerInput: Alexa.HandlerInput): Promise<void> {
		let canHandle = handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'SessionsIntent';
		if (canHandle) {
			console.log('SessionsRequestInterceptor');
			let sessAttrs = handlerInput.attributesManager.getSessionAttributes();
			let vals = utils.getSlotValues((<IntentRequest> handlerInput.requestEnvelope.request).intent.slots);
			return DataHelper.findSessions(vals)
				.then((response) => {
					if (utils.isResponseValid(response)) {
						sessAttrs.foundSessions = response;
						handlerInput.attributesManager.setSessionAttributes(sessAttrs);
					}
				});
		}
		return null;
	}
}
/**
 * The intent handler for requesting sessions
 */
const SessionsIntentHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'SessionsIntent';
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		console.log('SessionsIntentHandler, handlerInput=', handlerInput);
		let sessAttrs = handlerInput.attributesManager.getSessionAttributes();

		let foundSessions = sessAttrs.foundSessions;
		console.log('SessionsIntentHandler, foundSessions=', JSON.stringify(foundSessions));
		if (foundSessions) {
			let currSessResp: rpTypes.TextResponse = ResponseGenerator.getSessionsResp(foundSessions, -1);
			let speechTxt = currSessResp.textContent.primaryText.text;
			sessAttrs.speechOutput = speechTxt;
			sessAttrs.lastFoundIndex = foundSessions.length > 0 ? 0 : -1;
			handlerInput.attributesManager.setSessionAttributes(sessAttrs);
			return handlerInput.responseBuilder
				.speak(speechTxt)
				.withSimpleCard(currSessResp.cardTitle, currSessResp.cardText)
				.withShouldEndSession(false)
				.getResponse();
		}else {
			// todo: we probably should just throw an error
			let speechTxt = 'I don\'t have any sessions, please try again';

			return handlerInput.responseBuilder
				.speak(speechTxt)
				.withShouldEndSession(false)
				.getResponse();
		}
	}
};
/**
 * When the user says stop or cancel. Says goodbye and ends the session
 */
const CancelAndStopIntentHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		let resp = ResponseGenerator.cancelStopResponse;
		const speechText = resp.textContent.primaryText.text;

		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard(resp.cardTitle, speechText)
			.withShouldEndSession(true)
			.getResponse();
	}
};
/**
 * Handler for when help is requested
 */
const HelpIntentHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		let sessAttrs = handlerInput.attributesManager.getSessionAttributes();

		let resp = ResponseGenerator.helpResponse;
		let speechText = resp.textContent.primaryText.text;
		speechText += ' or ' + resp.textContent.secondaryText.text;
		speechText += ' or ' + resp.textContent.tertiaryText.text;
		sessAttrs.speechOutput = speechText;
		handlerInput.attributesManager.setSessionAttributes(sessAttrs);

		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard(resp.cardTitle, speechText)
			.getResponse();
	}
}
// TODO:
const MoreNextAndPageDownIntentHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NextIntent' || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.MoreIntent' || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PageDownIntent' || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ScrollDownIntent');
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		console.log('hello-engage.MoreNextAndPageDownIntentHandler.handle', arguments);
		return null;
	}
}
// TODO:
const PreviousAndPageUpIntentHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PreviousIntent' ||  handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PageUpIntent' || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ScrollUpIntent');
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		return null;
	}
}
/**
 * No Intent handler. Will read off the next found session
 */
const NoIntentHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'NoIntent';
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		let sessAttrs = handlerInput.attributesManager.getSessionAttributes();
		let lastIdx = sessAttrs.lastFoundIndex;
		let foundSessions = sessAttrs.foundSessions;
		if (lastIdx + 1 === foundSessions.length) { // There are no more
			let speechText = 'Sorry, that\'s all the sessions we found. Please try again';
			return handlerInput.responseBuilder
				.speak(speechText)
				.withShouldEndSession(true)
				.getResponse();
		}else {
			let noResp = ResponseGenerator.getNoResponse(foundSessions, lastIdx);
			let speechTxt = noResp.textContent.primaryText.text;

			sessAttrs.speechOutput = speechTxt;
			sessAttrs.lastFoundIndex = lastIdx + 1;
			return handlerInput.responseBuilder
				.speak(speechTxt)
				.withSimpleCard(noResp.cardTitle, speechTxt)
				.withShouldEndSession(false)
				.getResponse();
		}
	}
}
/**
 * Yes Intent handler. Will respond with happiness
 */
const YesIntentHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'YesIntent';
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		let yesResp: rpTypes.TextResponse = ResponseGenerator.yesResponse;

		return handlerInput.responseBuilder
			.speak(yesResp.textContent.primaryText.text)
			.withSimpleCard(yesResp.cardTitle, '')
			.withShouldEndSession(true)
			.getResponse()
	}
}
/**
 * Repeat Intent handler. Will repeat the last thing spoken
 */
const RepeatIntentHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		const sessionAttrs = handlerInput.attributesManager.getSessionAttributes();
		console.log('RepeatIntentHandler, sessionAttrs=', sessionAttrs);
		let speechTxt = sessionAttrs.speechOutput;
		console.log('RepeatIntentHandler, speechTxt=', speechTxt);
		return handlerInput.responseBuilder
			.speak(speechTxt)
			.reprompt(speechTxt)
			.getResponse();
	}
}
/**
 * Fired when the a SessionEnded happens
 */
const SessionEndedRequestHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		let speechTxt = 'Goodbye!';
		let handlerReq = (<any> handlerInput.requestEnvelope.request);
		if (handlerReq && handlerReq.error.message) {
			speechTxt = handlerReq.error.message;
		}
		return handlerInput.responseBuilder
			.speak(speechTxt)
			.getResponse();
	}
}
/**
 * When an error occurs. Will end the session
 */
const ErrorHandler: rpTypes.IntentHandler = {
	canHandle(): boolean {
		return true;
	},
	handle(handlerInput, error): Response {
		console.log('ErrorHandler, error=', error);
		return handlerInput.responseBuilder
			.speak('Sorry, an error occurred:' + error.message + '. Please say again')
			.withSimpleCard('Sorry, an error occurred', error.message)
			.withShouldEndSession(true)
			.getResponse();
	}
}

const skillBuilder = Alexa.SkillBuilders.custom();

export const handler = skillBuilder
	.addRequestHandlers(
		CancelAndStopIntentHandler,
		GeneralGreetingIntentHandler,
		HelpIntentHandler,
		LaunchRequestHandler,
		MoreNextAndPageDownIntentHandler,
		PreviousAndPageUpIntentHandler,
		RepeatIntentHandler,
		SessionEndedRequestHandler,
		SessionsIntentHandler,
		NoIntentHandler,
		YesIntentHandler
	)
	.addRequestInterceptors(SessionsRequestInterceptor)
	.addErrorHandlers(ErrorHandler)
	.lambda();
