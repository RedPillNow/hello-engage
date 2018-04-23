namespace Dig {
	export class Form extends Dig.Vertex {
		private _alias: string;
		private _computedSubformList: any[];
		private _hideEdit: boolean;
		private _hideNotes: boolean;
		private _hideRead: boolean;
		private _hideWeb: boolean;
		private _names: string[];

		constructor(apiObject: any) {
			super(apiObject);
		}

		get alias() {
			if (!this._alias && this.apiObject) {
				this._alias = this.apiObject.alias;
			}
			return this._alias;
		}

		get computedSubformList() {
			if ((!this._computedSubformList || this._computedSubformList.length === 0) && this.apiObject) {
				this._computedSubformList = this.apiObject.computedsubformlist;
			}
			return this._computedSubformList;
		}

		get hideEdit() {
			if ((this._hideEdit === null || this._hideEdit === undefined) && this.apiObject) {
				this._hideEdit = this.apiObject.hideedit === null || this.apiObject.hideedit === undefined ? true : this.apiObject.hideedit;
			}
			return this._hideEdit;
		}

		get hideNotes() {
			if ((this._hideNotes === null || this._hideNotes === undefined) && this.apiObject) {
				this._hideNotes = this.apiObject.notes === null || this.apiObject.notes === undefined ? false : this.apiObject.notes;
			}
			return this._hideNotes;
		}

		get hideRead() {
			if ((this._hideRead === null || this._hideRead === undefined) && this.apiObject) {
				this._hideRead = this.apiObject.hideread === null || this.apiObject.hideread === undefined ? false : this.apiObject.hideread;
			}
			return this._hideRead;
		}

		get hideWeb() {
			if ((this._hideWeb === null || this._hideWeb === undefined) && this.apiObject) {
				this._hideWeb = this.apiObject.hideweb === null || this.apiObject.hideweb === undefined ? false : this.apiObject.hideweb;
			}
			return this._hideWeb;
		}

		get names(): string[] {
			if (!this._names && this.apiObject && this.apiObject.names) {
				this._names = this.apiObject.names;
			}
			return this._names;
		}
	}

}
