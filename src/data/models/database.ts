namespace Dig {
	export class Database extends Dig.Vertex {
		private _filePath: string;
		private _fileSize: number;
		private _forensicsDate: string;
		private _lastDocCount: number;

		constructor(apiObject: any) {
			super(apiObject);
		}

		get filePath() {
			if (!this._filePath && this.apiObject) {
				this._filePath = this.apiObject.filepath;
			}
			return this._filePath;
		}

		get fileSize() {
			if (!this._fileSize && this.apiObject) {
				this._fileSize = this.apiObject.filesize;
			}
			return this._fileSize;
		}

		get forensicsDate() {
			if (!this._forensicsDate && this.apiObject) {
				this._forensicsDate = this.apiObject.forensicsdate;
			}
			return this._forensicsDate;
		}

		get lastDocCount() {
			if (!this._lastDocCount && this.apiObject) {
				this._lastDocCount = this.apiObject.lastdoccount;
			}
			return this._lastDocCount;
		}
	}
}
