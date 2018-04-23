namespace Dig {
	export class Document extends Dig.Vertex {

		private _card: Dig.Card;
		private _isEditable: boolean;
		private _isFavorite: boolean;
		private _replicaId: string;
		private _revisions: Date[];
		private _unid: string;
		private _updatedBy: Dig.Name[];
		private _proxyId: string;

		constructor(apiObject: any) {
			super(apiObject);
		}

		get(propertyName: string): any {
			// console.log('Dig.Document, get', arguments);
			propertyName = propertyName ? propertyName.toLowerCase() : propertyName;
			if (this.apiObject && this.apiObject[propertyName]) {
				return this.apiObject[propertyName];
			}
			return null;
		}

		set(propertyName: string, propertyValue: any) {
			this.apiObject[propertyName.toLowerCase()] = propertyValue;
		}

		get card() {
			return this._card;
		}

		set card(card: Dig.Card) {
			this._card = card;
		}

		get isEditable() {
			if ((this._isEditable === undefined || this._isEditable === null) && this.apiObject) {
				this._isEditable = this.apiObject['@editable'] || false;
			}
			return this._isEditable;
		}

		get isFavorite() {
			if ((this._isFavorite === null || this._isFavorite === undefined) && this.apiObject) {
				if ('#favorites' in this.apiObject) {
					for (let i = 0; i < this.apiObject['#favorites'].length; i++) {
						let doc = <Dig.Document>this.apiObject['#favorites'][i];
						if (doc.id === this.id) {
							this._isFavorite = true;
							break;
						}
					}
				} else {
					this._isFavorite = false;
				}
			}
			return this._isFavorite;
		}

		set isFavorite(isFavorite) {
			this._isFavorite = isFavorite;
		}

		get proxyId() {
			if (!this._proxyId && this.apiObject) {
				if (this.apiObject.hasOwnProperty('@proxyid')) {
					this._proxyId = this.apiObject['@proxyid'];
				} else if (this.apiObject.hasOwnProperty('_oda_proxyid')) {
					this._proxyId = this.apiObject['_oda_proxyid'];
				}
			}
			return this._proxyId;
		}

		get replicaId() {
			if (!this._replicaId && this.proxyId) {
				this._replicaId = this.proxyId.substring(0, 16);
			}
			return this._replicaId;
		}

		get revisions(): Date[] {
			if (!this._revisions && this.apiObject && this.apiObject['$revisions']) {
				if (this.apiObject['$revisions'].length > 0) {
					let revs = [];
					for (let i = 0; i < this.apiObject['$revisions'].length; i++) {
						let rev = this.apiObject['$revisions'][i];
						let dte = new Date(rev);
						revs.push(dte);
					}
					this._revisions = revs;
				}
			}
			return this._revisions;
		}

		get unid() {
			if (!this._unid && this.id) {
				this._unid = this.id.substring(16);
			}
			return this._unid;
		}

		get updatedBy(): Dig.Name[] {
			if (!this._updatedBy && this.apiObject && this.apiObject['$updatedby']) {
				if (this.apiObject['$updatedby'].length > 0) {
					let updates = [];
					for (let i = 0; i < this.apiObject['$updatedby'].length; i++) {
						let name = new Dig.Name(this.apiObject['$updatedby'][0]);
						updates.push(name);
					}
					this._updatedBy = updates;
				}
			}
			return this._updatedBy;
		}
		/**
		 * Gets all the fields for a document that are defined in cards
		 *
		 * @returns {Dig.Field[]}
		 */
		getAllFields(): Dig.Field[] {
			let fields = [];
			if (this.card) {
				let addFields = (card) => {
					if (card.fields) {
						for (let i = 0; i < card.fields.length; i++) {
							let fld = card.fields[i];
							fields.push(fld);
						}
					}
				};
				let processCards = (card) => {
					if (card.cards) {
						for (let j = 0; j < card.cards.length; j++) {
							let childCard = card.cards[j];
							addFields(childCard);
							processCards(childCard);
						}
					}
				}
				addFields(this.card);
				for (let j = 0; j < this.card.cards.length; j++) {
					let card = this.card.cards[j];
					if (!card.inDrawer) {
						addFields(card);
						processCards(card);
					}
				}
			}
			return fields;
		}

		getAddressFields(): Dig.Field[] {
			let addrFields = [];
			let fields = this.getAllFields();
			addrFields = fields.filter((fld) => {
				return fld.fieldType === 'address';
			});
			return addrFields;
		}
	}
}
