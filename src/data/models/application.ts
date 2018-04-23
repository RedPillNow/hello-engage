namespace Dig {
	export class Application extends Dig.Vertex {
		private _rendering: any[];
		private _listings: Dig.Listing[];
		private _replica: Dig.Replica;
		private _isFavorite: boolean;
		private _isHidden: boolean;
		private _tags: Dig.Tag[];
		private _cards: Dig.Card[];
		private _editable: boolean;

		constructor(apiObject?: any) {
			super(apiObject);
		}

		get cards() {
			if (!this._cards && this.apiObject && this.apiObject['#hascardin']) {
				let cards = [];
				let apiCards = this.apiObject['#hascardin'];
				if (apiCards) {
					for (let i = 0; i < apiCards.length; i++) {
						let card = new Dig.Card(apiCards[i]);
						cards.push(card);
					}
				}
				this._cards = cards;
			}
			return this._cards;
		}

		set cards(cards: any[]) {
			if (cards && cards.length > 0) {
				if (!(cards[0] instanceof Dig.Card)) {
					let cardObjs = [];
					for (let i = 0; i < cards.length; i++) {
						let card = new Dig.Card(cards[i]);
						cardObjs.push(card);
					}
					this._cards = cardObjs;
				} else {
					this._cards = cards;
				}
			} else {
				this._cards = cards;
			}
		}

		get editable() {
			if (this.apiObject) {
				this._editable = this.apiObject.editable || false;
			}
			return this._editable;
		}

		set editable(editable: boolean) {
			this._editable = editable;
		}

		get isFavorite(): boolean {
			if ((this._isFavorite === null || this._isFavorite === undefined) && this.apiObject) {
				if ('#favorites' in this.apiObject) {
					for (let i = 0; i < this.apiObject['#favorites'].length; i++) {
						let app = <Dig.Application> this.apiObject['#favorites'][i];
						if (app.id === this.id) {
							this._isFavorite = true;
							break;
						}
					}
				}else {
					this._isFavorite = false;
				}
			}
			return this._isFavorite;
		}

		set isFavorite(isFavorite: boolean) {
			this._isFavorite = isFavorite;
		}

		get isHidden(): boolean {
			if ((this._isHidden === null || this._isHidden === undefined) && this.apiObject) {
				if ('#hides' in this.apiObject) {
					for (let i = 0; i < this.apiObject['#hides'].length; i++) {
						let app = <Dig.Application> this.apiObject['#hides'][i];
						if (app.id === this.id) {
							this._isHidden = true;
							break;
						}
					}
				}else {
					this._isHidden = false;
				}
			}
			return this._isHidden;
		}

		set isHidden(isHidden: boolean) {
			this._isHidden = isHidden;
		}

		get listings(): Dig.Listing[] {
			if (!this._listings || this._listings.length === 0) {
				let listingObjs = [];
				if (this.rendering && this.rendering.length > 0) {
					listingObjs = this.rendering.filter(function (vw) {
						return vw.title.indexOf('(') === -1;
					}).sort(function (a, b) {
						if (a.sequence < b.sequence) {
							return -1;
						} else if (a.sequence > b.sequence) {
							return 1;
						} else {
							return 0;
						}
					});
				} else if (this.apiObject && this.apiObject['#haslistingin']) {
					listingObjs = this.apiObject['#haslistingin'];
				}
				this._listings = [];
				for (let i = 0; i < listingObjs.length; i++) {
					let listing = listingObjs[i];
					if (!(listing instanceof Dig.Listing)) {
						listing = new Dig.Listing(listingObjs[i]);
					}
					this._listings.push(listing);
				}
			}
			return this._listings;
		}

		set listings(listings: Dig.Listing[]) {
			if (listings && listings.length > 0) {
				if (!(listings[0] instanceof Dig.Listing)) {
					let listingsArr = [];
					for (let i = 0; i < listings.length; i++) {
						let listing = new Dig.Listing(listings[i]);
						listingsArr.push(listing);
					}
					this._listings = listingsArr;
				} else {
					this._listings = listings;
				}
			} else {
				this._listings = [];
			}
		}

		get rendering(): any {
			if (!this._rendering && this.apiObject) {
				if (this.apiObject['@rendering'] && this.apiObject['@rendering'].length > 0) {
					if (!(this.apiObject['@rendering'][0] instanceof Dig.Listing)) {
						let rendering = [];
						let apiRendering = this.apiObject['@rendering'];
						for (let i = 0; i < apiRendering.length; i++) {
							let listing = new Dig.Listing(apiRendering[i]);
							rendering.push(listing);
						}
						this._rendering = rendering;
					} else {
						this._rendering = this.apiObject['@rendering'];
					}
				}
			}
			return this._rendering;
		}

		set rendering(rendering: any) {
			if (rendering && rendering.length > 0) {
				if (!(rendering[0] instanceof Dig.Listing)) {
					this.apiObject['@rendering'] = rendering;
					let listings = [];
					for (let i = 0; i < rendering.length; i++) {
						let listing = new Dig.Listing(rendering[i]);
						listings.push(listing);
					}
					this._rendering = listings;
				} else {
					this._rendering = rendering;
				}
			} else {
				this._rendering = rendering;
			}
		}

		get replica(): Dig.Replica {
			if (!this._replica && this.apiObject) {
				if (this.apiObject['#renderedbyin'] && this.apiObject['#renderedbyin'].length > 0) {
					let repObj = this.apiObject['#renderedbyin'][0];
					this._replica = new Dig.Replica(repObj);
				}
			}
			return this._replica;
		}

		set replica(replica: Dig.Replica) {
			this._replica = replica;
			if (replica) {
				let apiObject = this.apiObject;
				apiObject['#renderedbyin'] = [replica];
				this.apiObject = apiObject;
			}
		}

		get tags() {
			if (!this._tags && this.apiObject && this.apiObject['#tags']) {
				let tags = [];
				let apiTags = this.apiObject['#tags'];
				for (let i = 0; i < apiTags.length; i++) {
					let tag = new Dig.Tag(apiTags[i]);
					tags.push(tag);
				}
				this._tags = tags;
			}
			return this._tags;
		}

		set tags(tags: any[]) {
			if (tags && tags.length > 0) {
				if (!(tags[0] instanceof Dig.Tag)) {
					let tagObjs = [];
					for (let i = 0; i < tags.length; i++) {
						let tag = new Dig.Tag(tags[i]);
						tagObjs.push(tag);
					}
					this._tags = tagObjs
				} else {
					this._tags = tags;
				}
			} else {
				this._tags = tags;
			}
		}

		isDigApplication(): boolean {
			return this.type === 'com.redpill.model.now.Application';
		}

		getDefaultViewId(): string {
			let returnVal = null;
			let firstListingId = null;
			let rendering = this.rendering;
			if (rendering && rendering.length > 0) {
				for (let i = 0; i < rendering.length; i++) {
					let view: Dig.Listing = rendering[i];
					if (view.title.indexOf('(') === -1) {
						if (firstListingId === null) {
							firstListingId = view.id
						}
						if (view.isDefault) {
							returnVal = view.id;
							break;
						}
					}
				}
				if (!returnVal) {
					returnVal = firstListingId;
				}
			}
			return returnVal;
		}

	}
}
