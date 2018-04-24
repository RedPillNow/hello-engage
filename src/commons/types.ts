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

export type ViewData = {
	'@timestamp': string,
	'@toplevelentries': string,
	'viewentry': ViewEntry[]
}

export type ViewEntry = {
	'@position': string,
	'@unid': string,
	'@noteid': string,
	'@siblings': string,
	'entrydata': ViewEntryColumn[]
}

export type ViewEntryColumn = {
	'@columnnumber': string,
	'@name': string,
	'datetime'?: any,
	'text'?: any
}

export type Session = {
	title: string,
	speakers: Speaker[],
	datetime: string,
	room: string,
	abstract: string,
	spoken: Session
}

export type Speaker = {
	name: string,
	photo: string,
	org: string
}
