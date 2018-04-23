namespace Dig {
	export class FacetValue {
		private _categoryId: string;
		private _value: string;
		private _apiObject: any;

		constructor(apiObject: any) {
			this.apiObject = apiObject;
		}

		get apiObject(): any {
			return this._apiObject;
		}

		set apiObject(apiObject: any) {
			this._apiObject = apiObject;
			this._categoryId = apiObject ? apiObject.categoryid : null;
			this._value = apiObject ? apiObject.value : null;
		}

		get categoryId(): string {
			if (!this._categoryId && this.apiObject) {
				this._categoryId = this.apiObject.categoryid;
			}
			return this._categoryId;
		}

		get value(): string {
			if (!this._value && this.apiObject) {
				this._value = this.apiObject.value;
			}
			return this._value;
		}
	}
}

namespace Dig {
	export class ApplicationFacet {
		private _id: string;
		private _title: string;
		private _values: Dig.FacetValue[];
		private _apiObject: any;

		constructor(apiObject: any) {
			// console.debug('constructing an ApplicationFacet', arguments);
			this.apiObject = apiObject;
		}

		get apiObject(): any {
			return this._apiObject;
		}

		set apiObject(apiObject: any) {
			this._apiObject = apiObject;
			this._id = apiObject ? apiObject.id : null;
			this._title = apiObject ? apiObject.title : null;
		}

		get id(): string {
			if (!this._id && this.apiObject) {
				this._id = this.apiObject.id;
			}
			return this._id;
		}

		get title(): string {
			if (!this._title && this.apiObject) {
				this._title = this.apiObject.title;
			}
			return this._title;
		}

		get values(): Dig.FacetValue[] {
			if ((!this._values || this._values.length === 0) && this.apiObject) {
				let vals = this.apiObject.values;
				// Remove Duplicates
				let _vals = vals.filter((val, idx) => {
					return vals.indexOf(val) == idx;
				});
				// Sort the values
				_vals = _vals.sort((a, b) => {
					if (a.value < b.value) {
						return -1;
					} else if (a.value > b.value) {
						return 1;
					} else {
						return 0;
					}
				});

				this._values = [];
				for (let i = 0; i < _vals.length; i++) {
					let val = new Dig.FacetValue(_vals[i]);
					if (val && val.value && val.value !== 'null') {
						this._values.push(val);
					}
				}
			}
			return this._values;
		}
	}
}
