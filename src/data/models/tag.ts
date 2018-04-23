namespace Dig {
	export class Tag extends Dig.Vertex {
		private _value: string;
		private _applications: Dig.Application[];

		constructor(apiObject: any) {
			super(apiObject);
		}

		get value() {
			if (!this._value && this.apiObject) {
				this._value = this.apiObject.value;
			}
			return this._value;
		}

		set value(value: string) {
			this._value = value;
		}

		get title() {
			return this.value;
		}

		get applications() {
			if ((!this._applications || this._applications.length === 0) && this.apiObject) {
				if (this.apiObject['#tagsin'] && this.apiObject['#tagsin'].length > 0) {
					let apps = this.apiObject['#tagsin'];
					this._applications = [];
					for (let i = 0; i < apps.length; i++) {
						let app = new Dig.Application(apps[i]);
						this._applications.push(app);
					}
				}
			}
			return this._applications;
		}
	}
}
