namespace Dig {
	export class Vertex {
		protected _title: string;
		private _id: string;
		private _apiObject: any;
		private _type: string;
		private _createdDate: string;
		private _modifiedDate: string;
		private _editors: Dig.Name[];
		private _edges: any[];
		private _isPortal: boolean;
		private _isMobile: boolean;
		private _isSocial: boolean;
		private _isForensics: boolean;
		private _url: string;
		private _key: string;
		private _isLiked: boolean;
		private _likes: Dig.Person[];
		private _likesCount: number;
		private _comments: Dig.Comment[];

		constructor(apiObject?: any) {
			this.apiObject = apiObject;
		}

		get apiObject(): any {
			return this._apiObject;
		}

		set apiObject(apiObject: any) {
			this.setApiObject(apiObject);
		}

		/**
		 * Initializes properties based on the API object; called by the setter method for apiObject.
		 *
		 * Override this method to perform specific initialization for the subclass based on the API object.
		 * Make sure you call super.setApiObject() to initialize the properties in this class.
		 */
		protected setApiObject(apiObject: any) {
			this._apiObject = apiObject;
			if (apiObject) {
				this._title = apiObject.title;
				this._id = apiObject['@id'];
				this._type = apiObject['@type'];
				this._createdDate = apiObject['@createddate'];
				this._modifiedDate = apiObject['@modifieddate'];
				this._edges = apiObject['@edges'] ? apiObject['@edges'] : null;
				this._isPortal = apiObject.isportal || apiObject.isinportal;
				this._isMobile = apiObject.mobile;
				this._isSocial = apiObject.social;
				this._isForensics = apiObject.forensics;
			}
		}

		get isPortal(): boolean {
			if ((this._isPortal === null || this._isPortal === undefined) && this.apiObject) {
				let key = 'isportal';
				if (this.apiObject.hasOwnProperty('isinportal')) {
					key = 'isinportal';
				}
				if (this.apiObject[key] === null || this.apiObject[key] === undefined) {
					this._isPortal = true;
				} else {
					this._isPortal = this.apiObject[key] ? true : false;
				}
			}
			return this._isPortal;
		}

		set isPortal(isPortal: boolean) {
			this._isPortal = isPortal;
		}

		get isForensics(): boolean {
			if ((this._isForensics === null || this._isForensics === undefined) && this.apiObject) {
				if (this.apiObject.forensics === null || this.apiObject.forensics === undefined) {
					this._isForensics = true;
				} else {
					this._isForensics = this.apiObject.forensics ? true : false;
				}
			}
			return this._isForensics;
		}

		set isForensics(isForensics: boolean) {
			this._isForensics = isForensics;
		}

		get isSocial(): boolean {
			if ((this._isSocial === null || this._isSocial === undefined) && this.apiObject) {
				if (this.apiObject.social === null || this.apiObject.social === undefined) {
					this._isSocial = true;
				} else {
					this._isSocial = this.apiObject.social ? true : false;
				}
			}
			return this._isSocial;
		}

		set isSocial(isSocial: boolean) {
			this._isSocial = isSocial;
		}

		get isMobile(): boolean {
			if ((this._isMobile === null || this._isMobile === undefined) && this.apiObject) {
				if (this.apiObject.mobile === null || this.apiObject.mobile === undefined) {
					this._isMobile = true;
				} else {
					this._isMobile = this.apiObject.mobile ? true : false;
				}
			}
			return this._isMobile;
		}

		set isMobile(isMobile: boolean) {
			this._isMobile = isMobile;
		}

		get createdDate(): string {
			if (!this._createdDate && this._apiObject) {
				this._createdDate = this.apiObject['@createddate'];
			}
			return this._createdDate;
		}

		get editors(): Dig.Name[] {
			if (!this._editors && this._apiObject) {
				let editors = this.apiObject['@editors'] || [];
				this._editors = [];
				for (let i = 0; i < editors.length; i++) {
					this._editors.push(new Dig.Name(editors[i]));
				}
			}
			return this._editors;
		}

		get edges(): any {
			if (!this._edges && this._apiObject) {
				this._edges = this.apiObject['@edges'];
			}
			return this._edges;
		}

		get id(): string {
			if (!this._id && this._apiObject) {
				if ('@id' in this._apiObject) {
					this._id = this._apiObject['@id'];
				}else if ('id' in this._apiObject) {
					this._id = this._apiObject.id
				}
			}
			return this._id;
		}

		set id(id: string) {
			this._id = id;
		}

		get modifiedDate(): string {
			if (!this._modifiedDate && this._apiObject) {
				this._modifiedDate = this.apiObject['@modifieddate'];
			}
			return this._modifiedDate;
		}

		get title(): string {
			if (!this._title && this._apiObject) {
				this._title = this._apiObject.title;
			}
			return this._title;
		}

		set title(title: string) {
			this._title = title;
		}

		get type(): string {
			if (!this._type && this._apiObject) {
				this._type = this.apiObject['@type'];
			}
			return this._type;
		}

		get url(): string {
			let url = '/api/oda/frame/now';
			return url;
		}

		get key(): string {
			if (!this._key && this._apiObject) {
				this._key = this._apiObject['$$key'];
			}
			return this._key;
		}

		get isLiked() {
			if (this._isLiked === null || this._isLiked === undefined) {
				this._isLiked = false;
			}
			return this._isLiked;
		}

		set isLiked(isLiked) {
			this._isLiked = isLiked;
		}

		get likes() {
			if ((!this._likes || this._likes.length === 0) && (this.apiObject && this.apiObject['#likesin'])) {
				let likesArr = this.apiObject['#likesin'];
				let likes = [];
				for (let i = 0; i < likesArr.length; i++) {
					let likeObj = likesArr[i];
					likes.push(new Dig.Person(likeObj));
				}
				this._likes = likes;
			} else if (!this._likes || !this.apiObject['#likesin']) {
				this._likes === [];
			}
			return this._likes;
		}

		get likesCount() {
			if (this.likes) {
				this._likesCount = this.likes.length;
			} else {
				this._likesCount = 0;
			}
			return this._likesCount;
		}

		get comments() {
			if (!this._comments && this.apiObject && this.apiObject['#commentsaboutin']) {
				let commentObjs = this.apiObject['#commentsaboutin'];
				if (commentObjs && commentObjs.length > 0) {
					let comments = [];
					for (let i = 0; i < commentObjs.length; i++) {
						let commentObj = commentObjs[i];
						let comment = new Dig.Comment(commentObj);
						comments.push(comment);
					}
					this._comments = comments;
				}
			} else if (!this._comments) {
				this._comments = [];
			}
			return this._comments;
		}

		set comments(comments) {
			this._comments = comments;
		}

		doILike(user: Dig.Person) {
			let iLike = false;
			if (this.likes && this.likes.length > 0) {
				for (let i = 0; i < this.likes.length; i++) {
					let person = this.likes[i];
					if (user.id === person.id) {
						iLike = true;
						break;
					}
				}
			}
			return iLike;
		}
	}
}
