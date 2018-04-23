namespace Dig {
	export class Item extends Dig.Vertex {
		private _schemaProperty: string;

		constructor(apiObject) {
			super(apiObject);
		}

		get schemaProperty() {
			if (!this._schemaProperty && this.apiObject) {
				this._schemaProperty = this.apiObject.schemaproperty;
			}
			return this._schemaProperty;
		}

		set schemaProperty(schemaProperty: string) {
			this._schemaProperty = schemaProperty;
		}
	}
}
