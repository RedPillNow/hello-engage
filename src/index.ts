import * as Alexa from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import * as rpTypes from './commons/types';
import {ResponseGenerator} from './commons/response-generator';

const APP_ID = 'amzn1.ask.skill.6ae3d277-34f5-43c1-a52c-08b318becb16';
console.log('hello-engage Alexa Skill loading...');
const LaunchRequestHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		let resp = ResponseGenerator.launchResponse;
		const speechText = resp.textContent.primaryText.text;

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.withSimpleCard(resp.cardTitle, speechText)
			.getResponse();
	}
};

const GeneralGreetingIntentHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'GeneralGreetingIntent';
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		let resp = ResponseGenerator.generalGreetingResponse;
		const speechText = resp.textContent.primaryText.text;

		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard(resp.cardTitle, speechText)
			.getResponse();
	}
};

const SessionsIntentHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'SessionsIntent';
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		const resp = ResponseGenerator.getSessionsResponse(handlerInput);
		const speechText = resp.textContent.primaryText.text;

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.withSimpleCard(resp.cardTitle, speechText)
			.withShouldEndSession(false)
			.getResponse()
	}
};

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

const HelpIntentHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		let resp = ResponseGenerator.helpResponse;
		let speechText = resp.textContent.primaryText.text;
		speechText += ' or ' + resp.textContent.secondaryText.text;
		speechText += ' or ' + resp.textContent.tertiaryText.text;

		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard(resp.cardTitle, speechText)
			.getResponse();
	}
}
// TODO
const MoreNextAndPageDownIntentHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NextIntent' || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.MoreIntent' || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PageDownIntent' || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ScrollDownIntent');
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		console.log('hello-engage.MoreNextAndPageDownIntentHandler.handle', arguments);
		return null;
	}
}
// TODO
const PreviousAndPageUpIntentHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PreviousIntent' ||  handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PageUpIntent' || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ScrollUpIntent');
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		return null;
	}
}

const RepeatIntentHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		const sessionAttrs = handlerInput.attributesManager.getSessionAttributes();

		return handlerInput.responseBuilder
			.speak(sessionAttrs.speakOutput)
			.reprompt(sessionAttrs.repromptSpeech)
			.getResponse();
	}
}

const SessionEndedRequestHandler: rpTypes.IntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		let reason = JSON.stringify(handlerInput.requestEnvelope);
		console.log('SessionEndedRequestHandler: Session ended with reason: ${reason}');
		return handlerInput.responseBuilder.getResponse();
	}
}

const ErrorHandler: rpTypes.IntentHandler = {
	canHandle(): boolean {
		return true;
	},
	handle(handlerInput, error): Response {
		return handlerInput.responseBuilder
			.speak('Sorry, an error occurred:' + error.message + '. Please say again')
			.withSimpleCard('Sorry, an error occurred', error.message)
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
		SessionsIntentHandler
	)
	.addErrorHandlers(ErrorHandler)
	.lambda();
