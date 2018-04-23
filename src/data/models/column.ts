namespace Dig {
	export class Column {
		private _id: string;
		private _isCategory: boolean;
		private _isConstant: boolean;
		private _isHiddenFromListing: boolean;
		private _isHideDetail: boolean;
		private _isPhone: boolean;
		private _key: string;
		private _title: string;
		private _apiObject: any;
		private _type: string;
		private _hidden: boolean;
		private _isPortal: boolean;
		private _sorting: string;

		constructor(apiObject: any) {
			this.apiObject = apiObject;
		}

		get apiObject(): any {
			return this._apiObject;
		}

		set apiObject(apiObject: any) {
			this._apiObject = apiObject;
			this._id = apiObject.id;
			this._isCategory = apiObject.iscategory;
			this._isConstant = apiObject.isconstant;
			this._isHiddenFromListing = apiObject.ishiddenfromlisting;
			this._isHideDetail = apiObject.ishidedetail;
			this._key = apiObject.key;
			this._title = apiObject.title;
		}

		get id(): string {
			if (!this._id && this.apiObject) {
				this._id = this.apiObject.id;
			}
			return this._id;
		}

		get isCategory(): boolean {
			if ((this._isCategory === null || this._isCategory === undefined) && this.apiObject) {
				this._isCategory = this.apiObject.iscategory;
			}
			return this._isCategory;
		}

		get isPhone(): boolean {
			if (this._isPhone === null || this._isPhone === undefined) {
				this._isPhone = false;
			}
			return this._isPhone;
		}

		set isPhone(isPhone) {
			this._isPhone = isPhone;
		}

		get isPortal(): boolean {
			if ((this._isPortal === null || this._isPortal === undefined) && this.apiObject) {
				this._isPortal = this.apiObject.isportal;
			}
			return this._isPortal;
		}

		get isHidden(): boolean {
			if ((this._hidden === null || this._hidden === undefined) && this.apiObject) {
				this._hidden = this.apiObject.hidden;
			}
			return this._hidden;
		}

		get isConstant(): boolean {
			if ((this._isConstant === null || this._isConstant === undefined) && this.apiObject) {
				this._isConstant = this.apiObject.isconstant;
			}
			return this._isConstant;
		}

		get isHiddenFromListing(): boolean {
			if ((this._isHiddenFromListing === null || this._isHiddenFromListing === undefined) && this.apiObject) {
				this._isHiddenFromListing = this.apiObject.ishiddenfromlisting || this.apiObject.hiddenfromlisting;
			}
			return this._isHiddenFromListing;
		}

		set isHiddenFromListing(isHiddenFromListing) {
			this._isHiddenFromListing = isHiddenFromListing;
		}

		get isHideDetail(): boolean {
			if ((this._isHideDetail === null || this._isHideDetail === undefined) && this.apiObject) {
				this._isHideDetail = this.apiObject.ishidedetail;
			}
			return this._isHideDetail;
		}

		get key(): string {
			if (!this._key && this.apiObject) {
				this._key = this.apiObject.key;
			}
			return this._key;
		}

		get title(): string {
			if (!this._title && this.apiObject) {
				this._title = this.apiObject.title;
			}
			return this._title;
		}

		set title(title) {
			this._title = title;
		}

		get type(): string {
			return null;
		}

		set type(type: string) {
			this._type = type;
		}

		get sorting(): string {
			if (!this._sorting && this.apiObject) {
				this._sorting = this.apiObject.sorting;
			}
			return this._sorting;
		}
	}
}
