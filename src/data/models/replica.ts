namespace Dig {
	export class Replica extends Dig.Vertex {

		private _application: Dig.Application;
		private _database: Dig.Database;
		private _forensicsDate: string;
		private _forensicsStatus: string;
		private _forms: Dig.Form[];
		private _indexDocCount: number;
		private _indexStatus: string;
		private _isPortalized: boolean;
		private _portalizationStatus: string;
		private _replicaId: string;
		private _views: Dig.View[];

		constructor(apiObject?: any) {
			super(apiObject);
		}

		get application(): Dig.Application {
			if (!this._application && this.apiObject) {
				if (this.apiObject['#renderedbyin'] && this.apiObject['#renderedbyin'].length > 0) {
					this._application = new Dig.Application(this.apiObject['#renderedbyin'][0]);
				}
			}
			return this._application;
		}

		get database(): Dig.Database {
			if (!this._database && this.apiObject) {
				if (this.apiObject['#instanceofin'] && this.apiObject['#instanceofin'].length > 0) {
					this._database = new Dig.Database(this.apiObject['#instanceofin'][0]);
				}
			}
			return this._database;
		}

		get forensicsDate(): string {
			if (!this._forensicsDate && this.apiObject) {
				this._forensicsDate = this.apiObject.forensicsdate;
			}
			return this._forensicsDate;
		}

		get forensicsStatus(): string {
			if (!this._forensicsStatus && this.apiObject) {
				this._forensicsStatus = this.apiObject.forensicsstatus;
			}
			return this._forensicsStatus || 'Unknown';
		}

		get forms() {
			if ((!this._forms || this._forms.length === 0) && this.apiObject) {
				if (this.apiObject['#foundinin'] && this.apiObject['#foundinin'].length > 0) {
					let sortedForms = this.apiObject['#foundinin'].filter((item) => {
						return item['@type'].indexOf('Form') > -1;
					}).sort((a, b) => {
						if (a.title < b.title) {
							return -1;
						} else if (a.title > b.title) {
							return 1;
						} else {
							return 0;
						}
					});
					let forms = [];
					for (let i = 0; i < sortedForms.length; i++) {
						let frm = sortedForms[i];
						forms.push(new Dig.Form(frm));
					}
					this._forms = forms;
				}
			}
			return this._forms;
		}

		get indexDocCount(): number {
			if (!this._indexDocCount && this.apiObject) {
				this._indexDocCount = this.apiObject.indexdoccount;
			}
			return this._indexDocCount;
		}

		get indexStatus(): string {
			if (!this._indexStatus && this.apiObject) {
				this._indexStatus = this.apiObject.indexstatus;
			}
			return this._indexStatus || 'Unknown';
		}

		get isDigReplica(): boolean {
			return this.type === 'com.redpill.model.forensics.Replica';
		}

		get isPortalized(): boolean {
			if (this.application) {
				this._isPortalized = this.application.isPortal;
			} else {
				this._isPortalized = false;
			}
			return this._isPortalized;
		}

		get portalizationStatus(): string {
			if (!this._portalizationStatus && this.apiObject) {
				this._portalizationStatus = this.apiObject.portalizationstatus;
			}
			return this._portalizationStatus || 'Unknown';
		}

		get replicaId(): string {
			if (!this._replicaId && this.apiObject) {
				this._replicaId = this.apiObject.replicaid;
			}
			return this._replicaId;
		}

		set replicaId(replicaId: string) {
			this._replicaId = replicaId;
		}

		get views() {
			if ((!this._views || this._views.length === 0) && this.apiObject) {
				if (this.apiObject['#foundinin'] && this.apiObject['#foundinin'].length > 0) {
					let sortedViews = this.apiObject['#foundinin'].filter((item) => {
						return item['@type'].indexOf('View') > -1;
					}).sort((a, b) => {
						if (a.title < b.title) {
							return -1;
						} else if (a.title > b.title) {
							return 1;
						} else {
							return 0;
						}
					});
					let views = [];
					for (let i = 0; i < sortedViews.length; i++) {
						let vw = sortedViews[i];
						views.push(new Dig.View(vw));
					}
					this._views = views;
				}
			}
			return this._views;
		}
	}
}
