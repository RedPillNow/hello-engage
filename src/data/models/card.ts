namespace Dig {
	export class Card extends Dig.Vertex {
		private _cards: Dig.Card[];
		private _cardType: string;
		private _columnCount: number;
		private _dataModel: Dig.Document;
		private _edgeId: string;
		private _editable: boolean;
		private _fields: Dig.Field[];
		private _hideTitle: boolean;
		private _inDrawer: boolean;
		private _parentCard: Dig.Card;
		private _peopleHidden: boolean;
		private _peoplePosition: string;
		private _position: string;
		private _rendering: any;
		private _sequence: number;

		constructor(apiObject: any) {
			super(apiObject);
		}

		get cards() {
			if ((!this._cards || this._cards.length === 0) && this.apiObject) {
				let crds = this.apiObject['@rendering'] ? this.apiObject['@rendering'].cards : this.apiObject.cards;
				let cards = [];
				if (crds && crds.length > 0) {
					for (let i = 0; i < crds.length; i++) {
						let crd = new Card(crds[i]);
						crd.parentCard = this;
						if (this.dataModel) {
							crd.dataModel = this.dataModel;
						}
						cards.push(crd);
					}
				}
				this._cards = cards;
			}
			return this._cards;
		}

		set cards(cards: Dig.Card[]) {
			this._cards = cards;
		}

		get cardType() {
			if (!this._cardType && this.apiObject) {
				let type = this.apiObject.type;
				this._cardType = type ? type : 'single';
			}
			return this._cardType;
		}

		set cardType(cardType: string) {
			if (!cardType) {
				this._cardType = 'single';
			} else {
				this._cardType = cardType;
			}
		}

		get columnCount() {
			if (!this._columnCount) {
				this._columnCount = this.cardType === 'double' ? 2 : 1;
			}
			return this._columnCount;
		}

		get dataModel() {
			return this._dataModel;
		}

		set dataModel(doc: Dig.Document) {
			this._dataModel = doc;
			if (this.cards && this.cards.length > 0) {
				for (let i = 0; i < this.cards.length; i++) {
					let card = this.cards[i];
					if (!card.dataModel) {
						card.dataModel = this.dataModel;
					}
				}
			}
			/* if (this.fields && this.fields.length > 0) {
				for (let i = 0; i < this.fields.length; i++) {
					let field = this.fields[i] as Dig.Field;
					if (!field.value) {
						field.value = doc.get(field.title);
					}
				}
			} */
		}

		get edgeId() {
			//console.log('Dig.Card.get edgeId');
			if (!this._edgeId && this.apiObject) {
				//console.log('Dig.Card.get edgeId, apiObject["@edgeid"]=', this.apiObject['@edgeid']);
				this._edgeId === this.apiObject['@edgeid'];
			}
			//console.log('Dig.Card.get edgeId, returning', this._edgeId);
			return this._edgeId || this.apiObject['@edgeid'];
		}

		set edgeId(edgeId: string) {
			// console.log('Dig.Card set edgeId', edgeId);
			this._edgeId = edgeId;
		}

		get fields() {
			if ((!this._fields || this._fields.length === 0) && this.apiObject) {
				let flds = this.apiObject['@rendering'] ? this.apiObject['@rendering'].fields : this.apiObject.fields;
				let fields = [];
				if (flds && flds.length > 0) {
					for (let i = 0; i < flds.length; i++) {
						let fld = new Dig.Field(flds[i]);
						fld.parentCard = this;
						if (this.dataModel) {
							// fld.value = this.dataModel.get(fld.title);
						}
						fields.push(fld);
					}
				}
				this._fields = fields;
			}
			return this._fields;
		}

		set fields(fields: any[]) {
			this._fields = fields;
		}

		get hideTitle() {
			if ((this._hideTitle === null || this._hideTitle === undefined) && this.apiObject) {
				this._hideTitle = this.apiObject.hidetitle || false;
			}
			return this._hideTitle;
		}

		set hideTitle(hideTitle: boolean) {
			this._hideTitle = hideTitle;
		}

		get inDrawer() {
			if ((this._inDrawer === null || this._inDrawer === undefined) && this.apiObject) {
				this._inDrawer = this.apiObject['@indrawer'] || false;
			}
			return this._inDrawer;
		}

		set inDrawer(inDrawer: boolean) {
			this._inDrawer = inDrawer;
		}

		get isEditable() {
			if ((this._editable === null || this._editable === undefined) && this.apiObject) {
				if (this.dataModel && !this.dataModel.isEditable) {
					this._editable = false;
				} else {
					this._editable = this.apiObject['editable'] || false;
				}
			}
			return this._editable;
		}

		set isEditable(editable: boolean) {
			this._editable = editable;
		}

		get parentCard() {
			return this._parentCard;
		}

		set parentCard(parentCard: Dig.Card) {
			this._parentCard = parentCard;
		}

		get peopleHidden() {
			if ((this._peopleHidden === null || this._peopleHidden === undefined) && this.apiObject) {
				this._peopleHidden = this.apiObject.peoplehidden || false;
			}
			return this._peopleHidden;
		}

		set peopleHidden(inDrawer: boolean) {
			this._peopleHidden = inDrawer;
		}

		get peoplePosition() {
			if (!this._peoplePosition && this.apiObject) {
				this._peoplePosition = this.apiObject.peopleposition || 'top';
			}
			return this._peoplePosition;
		}

		set peoplePosition(peoplePosition: string) {
			this._peoplePosition = peoplePosition || 'top';
		}

		get position() {
			if (!this._peoplePosition && this.apiObject) {
				this._position = this.apiObject.position || 'top';
			}
			return this._position;
		}

		set position(position: string) {
			this._position = position;
		}

		get renderedCards(): Dig.Card[] {
			let renderedCards = [];
			if (this.cards && this.cards.length > 0) {
				let crds = this.cards.filter((item, idx, arr) => {
					return !item.inDrawer;
				});
				crds = crds.sort((a, b) => {
					if (a.sequence < b.sequence) {
						return -1;
					}else if (a.sequence > b.sequence) {
						return 1;
					}else {
						return 0;
					}
				});
				renderedCards = crds;
			}
			return renderedCards;
		}

		get renderedFields(): Dig.Field[] {
			let renderedFields = [];
			if (this.fields && this.fields.length > 0) {
				let flds = this.fields.filter((item, idx, arr) => {
					return !item.inDrawer;
				});
				flds = flds.sort((a, b) => {
					if (a.sequence < b.sequence) {
						return -1;
					}else if (a.sequence > b.sequence) {
						return 1;
					}else {
						return 0;
					}
				});
				renderedFields = flds;
			}
			return renderedFields;
		}

		get rendering(): any {
			if (!this._rendering && this.apiObject) {
				if (this.apiObject['@rendering']) {
					this._rendering = this.apiObject['@rendering'];
				} else if (this.apiObject.rendering) {
					this._rendering = this.apiObject.rendering;
				}
			}
			return this._rendering;
		}

		set rendering(rendering: any) {
			this._rendering = rendering;
			/*if (rendering && rendering.length > 0) {
				let apiObject = this.apiObject;
				apiObject['@rendering'] = rendering;
				this.apiObject = apiObject;
			}*/
		}

		get sequence() {
			if ((!this._sequence && this._sequence !== 0) && this.apiObject) {
				this._sequence = this.apiObject.sequence;
			}
			return this._sequence;
		}

		set sequence(sequence: number) {
			this._sequence = sequence;
		}

	}
}
