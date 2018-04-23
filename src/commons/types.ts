import * as Alexa from 'ask-sdk-core';
import { Response, interfaces } from 'ask-sdk-model';
import TextContent = interfaces.display.TextContent;
import Template = interfaces.display.Template;

export type IntentHandler = {
	canHandle(handlerInput?: Alexa.HandlerInput): boolean,
	handle(handlerInput: Alexa.HandlerInput, error?: any): Response
}

export type XhrOptions = {
	method: string,
	uri: string,
	resolveFullResponse: boolean,
	json: boolean,
	headers?: any,
	userName?: string,
	password?: string,
	body?: any,
	formData?: any
}

export type TextResponse = {
	textContent: TextContent,
	reprompt?: string,
	cardTitle: string,
	renderTemplate?: Template
}
