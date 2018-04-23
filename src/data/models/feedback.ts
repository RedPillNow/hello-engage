namespace Dig {

	export class Feedback extends Dig.Vertex {
		private _appName: string;
		private _body: string;
		private _browserLang: string;
		private _feedbackType: string;
		private _formName: string;
		private _from: Dig.Person;
		private _listingAction: string;
		private _listingName: string;
		private _platform: string;
		private _priority: string;
		private _rating: string;
		private _resolvedComment: Dig.Comment;
		private _resolvedDate: string;
		private _screenHeight: number;
		private _screenWidth: number;
		private _status: string;
		private _subject: string;
		private _touchDevice: boolean;
		private _userAgent: string;

		constructor(apiObject: any) {
			super(apiObject);
		}

		get appName() {
			if (!this._appName && this.apiObject) {
				this._appName = this.apiObject.appname || null;
			}
			return this._appName;
		}

		set appName(appName: string) {
			this._appName = appName;
			this.apiObject.appname = appName;
		}

		get body() {
			if (!this._body && this.apiObject) {
				this._body = this.apiObject.body;
			}
			return this._body;
		}

		set body(body: string) {
			this._body = body;
			this.apiObject.body = body;
		}

		get browserLang() {
			if (!this._browserLang && this.apiObject) {
				this._browserLang = this.apiObject.browserlang;
			}
			return this._browserLang;
		}

		set browserLang(browserLang: string) {
			this._browserLang = browserLang;
			this.apiObject.browserlang = browserLang;
		}

		get feedbackType() {
			if (!this._feedbackType && this.apiObject) {
				this._feedbackType = this.apiObject.type;
			}
			return this._feedbackType;
		}

		set feedbackType(feedbackType: string) {
			this._feedbackType = feedbackType;
			this.apiObject.type = feedbackType;
			this.apiObject.subject = feedbackType;
		}

		get formName() {
			if (!this._formName && this.apiObject) {
				this._formName = this.apiObject.formname;
			}
			return this._formName;
		}

		set formName(formName: string) {
			this._formName = formName;
			this.apiObject.formname = formName;
		}

		get from() {
			if (!this._from && this.apiObject && this.apiObject['#fromin']) {
				if (this.apiObject['#fromin'].length > 0) {
					this._from = new Dig.Person(this.apiObject['#fromin'][0]);
				}
			}
			return this._from;
		}

		set from(from: Dig.Person) {
			this._from = from;
		}

		get listingAction() {
			if (!this._listingAction && this.apiObject) {
				this._listingAction = this.apiObject.listingaction;
			}
			return this._listingAction;
		}

		set listingAction(listingAction: string) {
			this._listingAction = listingAction;
			this.apiObject.listingaction = listingAction;
		}

		get listingName() {
			if (!this._listingName && this.apiObject) {
				this._listingName = this.apiObject.listingname || null;
			}
			return this._listingName;
		}

		set listingName(listingName: string) {
			this._listingName = listingName;
			this.apiObject.listingname = listingName;
		}

		get platform() {
			if (!this._platform && this.apiObject) {
				this._platform = this.apiObject.platform;
			}
			return this._platform;
		}

		set platform(platform: string) {
			this._platform = platform;
			this.apiObject.platform = platform;
		}

		get priority() {
			if (!this._priority && this.apiObject) {
				this._priority = this.apiObject.priority || 'Low';
			}
			return this._priority;
		}

		set priority(priority: string) {
			this._priority = priority;
			this.apiObject.priority = priority;
		}

		get rating() {
			if (!this._rating && this.apiObject) {
				this._rating = this.apiObject.rating;
			}
			return this._rating;
		}

		set rating(rating: string) {
			this._rating = rating;
			this.apiObject.rating = rating;
		}

		get resolvedComment() {
			if (!this._resolvedComment && this.apiObject) {
				if (this.apiObject['#commentsaboutin'] && this.apiObject['#commentsaboutin'].length > 0) {
					this._resolvedComment = new Dig.Comment(this.apiObject['#commentsaboutin'][0]);
				}
			}
			return this._resolvedComment;
		}

		set resolvedComment(resolvedComment) {
			if (resolvedComment && typeof resolvedComment === 'string') {
				if (this._resolvedComment) {
					this._resolvedComment.body = resolvedComment;
				} else {
					this._resolvedComment = new Dig.Comment({ body: resolvedComment });
				}
			} else {
				this._resolvedComment = resolvedComment;
			}
		}

		get resolvedDate() {
			if (!this._resolvedDate && this.apiObject) {
				this._resolvedDate = this.apiObject.resolveddate;
			}
			return this._resolvedDate;
		}

		set resolvedDate(resolvedDate: string) {
			this._resolvedDate = resolvedDate;
			this.apiObject.resolveddate = resolvedDate;
		}

		get screenHeight() {
			if (!this._screenHeight && this.apiObject) {
				this._screenHeight = this.apiObject.screenheight;
			}
			return this._screenHeight;
		}

		set screenHeight(screenHeight: number) {
			this._screenHeight = screenHeight;
			this.apiObject.screenheight = screenHeight;
		}

		get screenWidth() {
			if (!this._screenWidth && this.apiObject) {
				this._screenWidth = this.apiObject.screenwidth;
			}
			return this._screenWidth;
		}

		set screenWidth(screenWidth: number) {
			this._screenWidth = screenWidth;
			this.apiObject.screenwidth = screenWidth;
		}

		get status() {
			if (!this._status && this.apiObject) {
				this._status = this.apiObject.status || 'New';
			}
			return this._status;
		}

		set status(status: string) {
			this._status = status;
			this.apiObject.status = status;
		}

		get subject() {
			if (!this._subject && this.apiObject) {
				this._subject = this.apiObject.subject;
			}
			return this._subject;
		}

		set subject(subject: string) {
			this._subject = subject;
			this.apiObject.subject = subject;
			this.apiObject.type = subject;
		}

		get touchDevice() {
			if (!this._touchDevice && this.apiObject) {
				this._touchDevice = this.apiObject.touchdevice;
			}
			return this._touchDevice;
		}

		set touchDevice(touchDevice: boolean) {
			this._touchDevice = touchDevice;
			this.apiObject.touchdevice = touchDevice;
		}

		get userAgent() {
			if (!this._userAgent && this.apiObject) {
				this._userAgent = this.apiObject.useragent;
			}
			return this._userAgent;
		}

		set userAgent(userAgent: string) {
			this._userAgent = userAgent;
			this.apiObject.useragent = userAgent;
		}

		get isValid(): boolean {
			let returnVal = false;
			if (this.subject === 'Add Database') {
				returnVal = this.appName && this.body ? true : false;
			} else if (this.subject === 'Remove Database') {
				returnVal = this.appName && this.body ? true : false;
			} else if (this.subject === 'Change View') {
				returnVal = this.appName && this.listingName && this.listingAction && this.body ? true : false;
			} else if (this.subject === 'Change Form') {
				returnVal = this.appName && this.formName && this.body ? true : false;
			} else if (this.subject === 'Submit Comment') {
				returnVal = this.body ? true : false;
			} else if (this.subject === 'Report Problem') {
				returnVal = this.appName && this.body ? true : false;
			}
			return returnVal;
		}
	}
}
