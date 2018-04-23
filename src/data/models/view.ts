namespace Dig {
	export class View extends Dig.Vertex {
		private _isFolder: boolean;
		private _isCalendar: boolean;
		private _isDefault: boolean;
		private _isExpandCollapse: boolean;
		private _viewVertex: any;
		private _names: string[];
		private _alias: string;
		private _entryCount: number;

		constructor(apiObject: any) {
			super(apiObject);
			this.init(apiObject);
		}

		init(apiObject: any) {
			this._isFolder = apiObject.isfolder;
			this._isCalendar = apiObject.iscalendar;
			this._isDefault = apiObject.isdefault;
			this._isExpandCollapse = apiObject.isexpandcollapse;
			this._names = apiObject.names;
			this._alias = apiObject.alias;
			this._viewVertex = apiObject.viewvertex;
		}

		get entryCount() {
			if ((this._entryCount === null || this._entryCount === undefined) && this.viewVertex) {
				this._entryCount = this.viewVertex.entrycount;
			}
			return this._entryCount;
		}

		get isFolder(): boolean {
			if (this._isFolder === null || this._isFolder === undefined) {
				if (this.apiObject) {
					let apiVal = this.apiObject.isfolder;
					if (apiVal === null || apiVal === undefined) {
						apiVal = false;
					}
					this._isFolder = apiVal;
				}
			}
			return this._isFolder;
		}

		get isCalendar(): boolean {
			if (this._isCalendar === null || this._isCalendar === undefined) {
				if (this.apiObject) {
					let apiVal = this.apiObject.iscalendar;
					if (apiVal === null || apiVal === undefined) {
						apiVal = false;
					}
					this._isCalendar = apiVal;
				}
			}
			return this._isCalendar;
		}

		get isDefault(): boolean {
			if (this._isDefault === null || this._isDefault === undefined) {
				if (this.apiObject) {
					this._isDefault = this.apiObject.isfolder;
				}
			}
			return this._isDefault;
		}

		get isExpandCollapse(): boolean {
			if (this._isExpandCollapse === null || this._isExpandCollapse === undefined) {
				if (this.apiObject) {
					this._isExpandCollapse = this.apiObject.isfolder;
				}
			}
			return this._isExpandCollapse;
		}

		get viewVertex(): any {
			if (!this._viewVertex && this.apiObject && this.apiObject.viewvertex) {
				this._viewVertex = this.apiObject.viewvertex;
			}
			return this._viewVertex;
		}

		get names(): string[] {
			if (!this._names && this.apiObject && this.apiObject.names) {
				this._names = this.apiObject.names;
			}
			return this._names;
		}

		get alias(): string {
			if (!this._alias && this.apiObject && this.apiObject) {
				this._alias = this.apiObject.alias;
				if (!this._alias && this.viewVertex) {
					let vwVertexTitle = this.viewVertex['$title'];
					if (vwVertexTitle && vwVertexTitle.indexOf('|') > -1) {
						let vertexTitleArr = vwVertexTitle.split('|');
						this._alias = vertexTitleArr[1];
					}
				}
			}
			return this._alias;
		}

	}
}
