namespace Dig {
	export class FieldInput {
		private _field: Dig.Field;
		private _fieldHtmlType: string;
		private _attributes: any;

		constructor() {}

		get field() {
			return this._field;
		}

		set field(field: Dig.Field) {
			this._field = field;
		}

		get fieldHtmlType() {
			if (!this._fieldHtmlType && this.field) {
				this._fieldHtmlType = 'paper-input';
				let field = this.field;
				let type = field.fieldType;
				let subType = field.subType ? field.subType.toLowerCase() : field.subType;
				let multiValue = field.multiValue;
				if (field.constrained) {
					let constrainedVals = field.constrainedSet;
					if (constrainedVals && constrainedVals.length > 0) {
						if (multiValue && constrainedVals.length < 5 && constrainedVals.length > 1) {
							this._fieldHtmlType = 'paper-checkbox';
						} else if (!multiValue && constrainedVals.length < 5 && constrainedVals.length > 1) {
							this._fieldHtmlType = 'paper-radio-group';
						} else if (!multiValue && constrainedVals.length > 4) {
							this._fieldHtmlType = 'vaadin-combobox';
						} else if (multiValue && constrainedVals.length > 4) {
							this._fieldHtmlType = 'paper-tags-dropdown';
						} else if (!multiValue && constrainedVals.length === 1) {
							this._fieldHtmlType = 'paper-toggle-button';
						}
					} else {
						this._fieldHtmlType = 'dig-empty-keyword-field';
					}
				} else {
					if (type === 'text' || type === 'number') {
						if (multiValue) {
							this._fieldHtmlType = 'paper-tags-input';
						} else {
							let bigText = this.isBigText;
							if (bigText) {
								this._fieldHtmlType = 'paper-textarea';
							} else {
								this._fieldHtmlType = 'paper-input';
							}
						}
					} else if (type === 'name') {
						if (subType === 'authors' || subType === 'readers' || subType === 'name') {
							if (multiValue) {
								this._fieldHtmlType = 'paper-tags-input';
							} else {
								this._fieldHtmlType = 'paper-input';
							}
						} else if (subType === 'email') {
							if (multiValue) {
								this._fieldHtmlType = 'paper-tags-input';
							} else {
								this._fieldHtmlType = 'gold-email-input';
							}
						} else {
							if (multiValue) {
								this._fieldHtmlType = 'paper-tags-input';
							} else {
								this._fieldHtmlType = 'paper-input';
							}
						}
					} else if (type === 'telephone') {
						this._fieldHtmlType = 'gold-phone-input';
					} else if (type === 'zip') {
						this._fieldHtmlType = 'gold-zip-input';
					} else if (type === 'richtext') {
						this._fieldHtmlType = 'marked-element';
					} else if (type === 'datetime' || type === 'time' || type === 'date') {
						if (type === 'datetime') {
							// TODO - Find a good alternative or something that matches paper-date-picker
							this._fieldHtmlType = 'paper-date-picker';
						} else if (type === 'time') {
							// TODO - Find a good match with paper-date-picker
						} else if (type === 'date') {
							this._fieldHtmlType = 'paper-date-picker';
						}
					} else if (type === 'address') {
						this._fieldHtmlType = 'now-address';
					} else {
						this._fieldHtmlType = 'paper-input';
					}
				}
			}
			return this._fieldHtmlType || 'paper-input';
		}

		get isBigText(): boolean {
			let isBigText = false;
			if (this.field && this.field.value) {
				if (this.field.value.length > 50) {
					isBigText = true;
				}
			}
			return isBigText;
		}

		get attributes() {
			if (!this._attributes && this.field && this.fieldHtmlType) {
				this._attributes = {};
				let field = this.field;
				let type = field.fieldType;
				let multiValue = field.multiValue;
				if (field.constrained) {
					let constrainedVals = field.constrainedSet || [];
					this._attributes = {};
					if (constrainedVals && constrainedVals.length > 0) {
						if (multiValue && constrainedVals.length < 5 && constrainedVals.length > 1) {

						} else if (!multiValue && constrainedVals.length < 5 && constrainedVals.length > 1) {
							this._attributes = {
								'allow-empty-selection': true
							};
						} else if (!multiValue && constrainedVals.length > 4) {
							// TODO - may not need anything here since checkbox is kind-of special
						} else if (multiValue && constrainedVals.length > 4) {
							this._attributes = {
								'read-only': true,
								'is-tag-removable': false,
								items: constrainedVals
							};
						} else if (!multiValue && constrainedVals.length === 1) {
							this._attributes = {
								id: 'combobox_' + field.id,
								label: field.label,
								readonly: true,
								name: field.title,
								items: constrainedVals
							};
						}
					} else {
						this._attributes = {
							label: field.label
						};
					}
				} else {
					if (type === 'text' || type === 'number') {
						if (multiValue) {
							this._attributes = {
								'read-only': true,
								'is-tag-removable': false,
								items: field.value
							};
						} else {
							let bigText = false;
							if (bigText) {
								this._attributes = {
									label: field.label,
									name: field.title,
									'max-rows': '5',
									readonly: true,
									'always-float-label': true
								};
							} else {
								this._attributes = {
									label: field.label,
									name: field.title,
									type: field.fieldType,
									readonly: true,
									'always-float-label': true,
									value: field.value
								};
							}
						}
					} else if (type === 'authors' || type === 'readers' || type === 'name') {
						if (multiValue) {
							this._attributes = {
								'read-only': true,
								'is-tag-removable': false,
								items: field.value
							}
						} else {
							this._attributes = {
								label: field.label,
								name: field.title,
								type: field.fieldType,
								readonly: true,
								'always-float-label': true,
								value: field.value
							};
						}
					} else if (type === 'email') {
						this._attributes = {
							label: field.label,
							name: field.title,
							'error-message': 'Please enter a valid email address (name@email-provider.com)',
							readonly: true,
							'auto-validate': true,
							'always-float-label': true
						};
					} else if (type === 'telephone') {
						this._attributes = {
							label: field.label,
							name: field.title,
							'error-message': 'Please enter a valid phone number',
							readonly: true,
							'auto-validate': true,
							'always-float-label': true
						};
					} else if (type === 'zip') {
						this._attributes = {
							label: field.label,
							name: field.title,
							'error-message': 'Please enter a valid zip code',
							readonly: true,
							'always-float-label': true
						};
					} else if (type === 'richtext') {
						this._attributes = {
							id: 'richText_' + field.id
						};
					} else if (type === 'datetime' || type === 'time' || type === 'date') {
						if (type === 'datetime') {
							// TODO - Find a good alternative or something that matches paper-date-picker
							this._attributes = {};
						} else if (type === 'time') {
							// TODO - Find a good match with paper-date-picker
							this._attributes = {};
						} else if (type === 'date') {
							this._attributes = {
								id: 'datepicker_' + field.id,
								'responsive-width': '767px'
							};
						}
					} else {
						this._attributes = {
							label: field.label,
							name: field.title,
							type: field.fieldType,
							readonly: true,
							'always-float-label': true
						};
					}
				}
			}
			return this._attributes;
		}

	}
}
