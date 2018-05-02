import { Speaker } from "./speaker";
import * as utils from '../commons/utils';

export class Session {
	_apiObj: any;
	private _session_date: Date;
	private _session_time: string; // start time
	private _session_time2: string; // end time
	private _session_room: string;
	private _session_nr: string;
	private _session_type: string; // $35
	private _session_title: string;
	private _session_abstract: string; // $37
	private _session_speakers: Speaker[];
	private _session_subtype: string; // $36

	constructor(apiObj) {
		this._apiObj = apiObj;
		this.init();
	}

	init(): void {
		let sessionDate = this.sessionDate;
		let sessionTime = this.sessionTime;
		let sessionTime2 = this.sessionTime2;
		let room = this.sessionRoom;
		let nr = this.sessionNr;
		let type = this.sessionType;
		let title = this.sessionTitle;
		let abs = this.sessionAbstract;
		let speakers = this.speakers;
		let subType = this.sessionSubtype;
	}

	get apiObj() {
		return this._apiObj;
	}

	get sessionDate() {
		if (!this._session_date && this.apiObj && this.apiObj.document.fields.session_date) {
			let dateStr = this.apiObj.document.fields.session_date.stringValue;
			this._session_date = new Date(dateStr);
		}
		return this._session_date;
	}

	set sessionDate(sessionDate) {
		this._session_date = sessionDate;
	}

	get spokenDate() {
		let spokenDate = '';
		if (this.apiObj.document.fields.session_date) {
			let dateTimeStr = this.apiObj.document.fields.session_date.stringValue;
			let time = this.sessionTime;
			let unformatTime = time.replace(':','');
			dateTimeStr = dateTimeStr + 'T' + unformatTime;
			dateTimeStr = utils.getSpokenDateText(dateTimeStr, new Date('5/21/2018'));
			dateTimeStr = dateTimeStr.replace(' </say-as>', '</say-as>');
			dateTimeStr = dateTimeStr.replace('"time"> ', '"time">');
			spokenDate = dateTimeStr;
		}
		return spokenDate;
	}

	get cardDate() {
		let spokenDate = '';
		if (this.apiObj.document.fields.session_date) {
			let dateTimeStr = this.apiObj.document.fields.session_date.stringValue;
			let time = this.sessionTime;
			let unformatTime = time.replace(':','');
			dateTimeStr = dateTimeStr + 'T' + unformatTime;
			dateTimeStr = utils.getPrintedDateText(dateTimeStr, new Date('5/21/2018'));
			spokenDate = dateTimeStr;
		}
		return spokenDate;
	}

	get sessionTime() {
		if (!this._session_time && this.apiObj && this.apiObj.document.fields.session_time1) {
			this._session_time = this.apiObj.document.fields.session_time1.stringValue;
		}
		return this._session_time;
	}

	set sessionTime(sessionTime) {
		this._session_time = sessionTime;
	}

	get sessionTime2() {
		if (!this._session_time2 && this.apiObj && this.apiObj.document.fields.session_time2) {
			this._session_time = this.apiObj.document.fields.session_time2.stringValue;
		}
		return this._session_time2;
	}

	set sessionTime2(sessionTime2) {
		this._session_time2 = sessionTime2;
	}

	get sessionRoom() {
		if (!this._session_room && this.apiObj && this.apiObj.document.fields.session_room) {
			this._session_room = this.apiObj.document.fields.session_room.stringValue;
		}
		return this._session_room;
	}

	set sessionRoom(sessionRoom) {
		this._session_room = sessionRoom;
	}

	get spokenRoom() {
		let spokenRoom = this.sessionRoom;
		if (!spokenRoom.toLowerCase().includes('room')) {
			spokenRoom += ' Room';
		}
		spokenRoom = spokenRoom.replace('A. ', '');
		spokenRoom = spokenRoom.replace('B. ', '');
		spokenRoom = spokenRoom.replace('C. ', '');
		spokenRoom = spokenRoom.replace('D. ', '');
		spokenRoom = spokenRoom.replace('E. ', '');
		return spokenRoom;
	}

	get sessionNr() {
		if (!this._session_nr && this.apiObj && this.apiObj.document.fields.session_nr) {
			this._session_nr = this.apiObj.document.fields.session_nr.stringValue;
		}
		return this._session_nr;
	}

	set sessionNr(sessionNr) {
		this._session_nr = sessionNr;
	}

	get sessionType() {
		if (!this._session_type && this.apiObj && this.apiObj.document.fields['$35']) {
			this._session_type = this.apiObj.document.fields['$35'].stringValue;
		}
		return this._session_type;
	}

	set sessionType(sessionType) {
		this._session_type = sessionType;
	}

	get sessionTitle() {
		if (!this._session_title && this.apiObj && this.apiObj.document.fields.session_title) {
			this._session_title = this.apiObj.document.fields.session_title.stringValue;
		}
		return this._session_title;
	}

	set sessionTitle(sessionTitle) {
		this._session_title = sessionTitle;
	}

	get spokenTitle() {
		let spokenTitle = this.sessionTitle;
		spokenTitle = spokenTitle.replace('(', '"');
		spokenTitle = spokenTitle.replace(')', '"');
		spokenTitle = spokenTitle.replace('&', 'and');
		return spokenTitle;
	}

	get sessionAbstract() {
		if (!this._session_abstract && this.apiObj && this.apiObj.document.fields['$37']) {
			this._session_abstract = this.apiObj.document.fields['$37'].stringValue;
		}
		return this._session_abstract;
	}

	set sessionAbstract(sessionAbstract) {
		this._session_abstract = sessionAbstract;
	}

	get speakers() {
		if ((!this._session_speakers || this._session_speakers.length === 0) && this.apiObj) {
			let spkrs = [];
			if (this.apiObj.document.fields.speaker_name) {
				let fldNames = ['name','org','photoUrl','logo','profile'];
				let primarySpk = new Speaker();
				primarySpk.name = this.apiObj.document.fields.speaker_name.stringValue;
				primarySpk.org = this.apiObj.document.fields.speaker_org.stringValue;
				primarySpk.photoUrl = this.apiObj.document.fields.speaker_photourl.stringValue;
				primarySpk.logo = this.apiObj.document.fields.speaker_logo.stringValue;
				primarySpk.profile = this.apiObj.document.fields.speaker_profile.stringValue;
				primarySpk.location = null;
				spkrs.push(primarySpk);
				if (this.apiObj.document.fields.speaker_name2.stringValue) {
					for (let i = 2; i <= 5; i++) {
						let spk = new Speaker();
						spk.location = i;
						for (let j = 0; j < fldNames.length; j++) {
							let fldName = 'speaker_' + fldNames[j] + i;
							if (fldName !== 'speaker_org5') {
								spk[fldNames[j]] = this.apiObj.document.fields[fldName.toLowerCase()].stringValue;
							}
						}
						if (spk.name) {
							spkrs.push(spk);
						}
					}
				}
			}
			this._session_speakers = spkrs;
		}
		return this._session_speakers;
	}

	set speakers(speakers) {
		this._session_speakers = speakers;
	}

	get spokenSpeakers() {
		let spokenSpeakers = '';
		let lastIdx = this.speakers.length - 1;
		for (let i = 0; i < this.speakers.length; i++) {
			let spkr = this.speakers[i];
			if (i === 0) {
				spokenSpeakers = spkr.name;
			} else if (i === lastIdx) {
				spokenSpeakers += ' and ' + spkr.name;
			}else {
				spokenSpeakers += ', ' + spkr.name;
			}
		}
		return spokenSpeakers;
	}

	get sessionSubtype() {
		if (!this._session_subtype && this.apiObj && this.apiObj.document.fields['$36']) {
			this._session_subtype = this.apiObj.document.fields['$36'].stringValue;
		}
		return this._session_subtype;
	}

	set sessionSubtype(sessionSubtype) {
		this._session_subtype = sessionSubtype;
	}

}
