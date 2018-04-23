namespace Dig {
	export class Listing extends Dig.Vertex {
		private _application: Dig.Application;
		private _categoryDepth: number;
		private _columnInfo: Dig.Column[];
		private _edgeId: string;
		private _facet: Dig.ApplicationFacet;
		private _gridContentFetchId;
		private _isDefault: boolean;
		private _sequence: number;
		private _view: Dig.View;
		private _viewId: string;
		private _viewVertexId: string;

		constructor(apiObject: any) {
			super(apiObject);
		}

		get categoryDepth(): number {
			if ((!this._categoryDepth && this._categoryDepth !== 0) && this.apiObject) {
				this._categoryDepth = this.apiObject.categorydepth;
			}
			return this._categoryDepth;
		}

		get edgeId() {
			if (!this._edgeId && this.apiObject) {
				this._edgeId = this.apiObject['@edgeid'];
			}
			return this._edgeId;
		}

		get viewId(): string {
			if (!this._viewId && this.apiObject) {
				this._viewId = this.apiObject.viewid;
			}
			return this._viewId;
		}

		get viewVertexId(): string {
			if (!this._viewVertexId && this.apiObject) {
				this._viewVertexId = this.apiObject.viewvertexid;
			}
			return this._viewVertexId;
		}

		get columnInfo(): Dig.Column[] {
			if ((!this._columnInfo || (this._columnInfo && this._columnInfo.length === 0)) && this.apiObject) {
				this._columnInfo = [];
				let colInfo = null;
				if (this.apiObject.columninfo) {
					colInfo = this.apiObject.columninfo;
				} else if (this.apiObject['@rendering'] && this.apiObject['@rendering'].columninfo) {
					colInfo = this.apiObject['@rendering'].columninfo;
				} else if (this.apiObject.columnInfo) {
					colInfo = this.apiObject.columnInfo;
				}
				if (colInfo) {
					for (let i = 0; i < colInfo.length; i++) {
						let col = new Column(colInfo[i]);
						this._columnInfo.push(col);
					}
				}
			}
			return this._columnInfo;
		}

		set columnInfo(columnInfo: Dig.Column[]) {
			this._columnInfo = columnInfo;
			if (columnInfo && columnInfo.length > 0) {
				if (!(columnInfo[0] instanceof Dig.Column)) {
					let colInfo: Dig.Column[] = [];
					for (let i = 0; i < columnInfo.length; i++) {
						let col = new Dig.Column(columnInfo[i]);
						colInfo.push(col);
					}
					this._columnInfo = colInfo;
				}
			}
		}

		get facet(): Dig.ApplicationFacet {
			if (!this._facet && this.apiObject) {
				if (this.apiObject['@rendering'] && this.apiObject['@rendering'].facets) {
					this._facet = new Dig.ApplicationFacet(this.apiObject['@rendering'].facets);
				} else if (this.apiObject.facets) {
					this._facet = new Dig.ApplicationFacet(this.apiObject.facets);
				}
			}
			return this._facet;
		}

		get application(): Dig.Application {
			if (!this._application && this.apiObject['#haslisting'] && this.apiObject['#haslisting'].length > 0) {
				this._application = new Dig.Application(this.apiObject['#haslisting'][0]);
			}
			return this._application;
		}

		set application(application: Dig.Application) {
			this._application = application;
		}

		get isDefault() {
			if ((this._isDefault === null || this._isDefault === undefined) && this.apiObject) {
				this._isDefault = this.apiObject.isdefault ? true : false;
			}
			return this._isDefault;
		}

		set isDefault(isDefault: boolean) {
			this._isDefault = isDefault;
		}

		get gridContentFetchId() {
			this._gridContentFetchId = this.viewVertexId ? this.viewVertexId : this.viewId;
			return this._gridContentFetchId;
		}

		get sequence() {
			if (!this._sequence && this.apiObject) {
				let newSeq = this.apiObject.sequence;
				if (newSeq === null || newSeq === undefined) {
					this._sequence = 10000;
				} else {
					this._sequence = newSeq;
				}
			}
			return this._sequence;
		}

		get view() {
			return this._view;
		}

		set view(view: Dig.View) {
			this._view = view;
		}
	}
}
