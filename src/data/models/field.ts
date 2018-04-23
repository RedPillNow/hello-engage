namespace Dig {

	declare var phoneUtils;
	export class Field extends Dig.Vertex {
		private _componentPart: string;
		private _computed: boolean;
		private _constrained: boolean;
		private _constrainedSet: any[];
		private _dateValue: any;
		private _disabled: boolean;
		private _displayIfBlank: boolean;
		private _displayLabel: string;
		private _displayValue: any;
		private _edgeId: string;
		private _fieldInput: Dig.FieldInput;
		private _fieldType: string;
		private _forensicsType: string;
		private _header: boolean;
		private _hidden: boolean;
		private _inDrawer: boolean;
		private _items: Dig.Item[];
		private _label: string;
		private _labelHidden: boolean;
		private _multiValue: boolean;
		private _parentCard: Dig.Card;
		private _phoneValue: string;
		private _phoneDialValue: string;
		private _required: boolean;
		private _schema: any;
		private _showLabelReadOnly: boolean;
		private _subType: string;
		private _timeValue: any;
		private _value: any;


		constructor(apiObject: any) {
			super(apiObject);
		}

		get componentPart() {
			if (!this._componentPart && this.apiObject) {
				this._componentPart = this.apiObject.componentpart || 'None';
			}
			return this._componentPart;
		}

		set componentPart(componentPart: string) {
			this._componentPart = componentPart;
		}

		get computed() {
			if ((this._computed === null || this._computed === undefined) && this.apiObject) {
				this._computed = this.apiObject.computed || false;
			}
			return this._computed;
		}

		set computed(computed: boolean) {
			this._computed = computed;
		}

		get constrained() {
			if ((this._constrained === null || this._constrained === undefined) && this.apiObject) {
				this._constrained = this.apiObject.constrained || false;
			}
			return this._constrained;
		}

		set constrained(constrained: boolean) {
			this._constrained = constrained;
		}

		get constrainedSet() {
			if (!this._constrainedSet && this.apiObject) {
				let valueList = this.apiObject.constrainset || [];
				if (valueList.length > 0) {
					let valueObjList = [];
					for (let i = 0; i < valueList.length; i++) {
						let val = valueList[i];
						let valArr = val.split('|');
						let valObj = {
							label: valArr[0].trim(),
							value: valArr[1] ? valArr[1].trim() : valArr[0].trim()
						};
						valueObjList.push(valObj);
					}
					valueList = valueObjList;
				}
				this._constrainedSet = valueList;
			}
			return this._constrainedSet;
		}

		set constrainedSet(constrainedSet: any[]) {
			this._constrainedSet = constrainedSet || [];
		}

		/**
		 * This is a placeholder property specfically to provide a date to a paper-date-picker
		 * it should be formatted as YYYY-MM-DD
		 *
		 */
		get dateValue() {
			if (!this._dateValue && this.value) {
				this._dateValue = new Date(this.value);
			} else if (!this._dateValue && !this.value) {
				this._dateValue = new Date();
			}
			// console.log('Dig.Field, get.dateValue returning', this._dateValue);
			return this._dateValue;
		}

		set dateValue(value: any) {
			// console.log('Dig.Field set.dateValue', arguments);
			this._dateValue = value;
		}

		get displayIfBlank() {
			if ((this._displayIfBlank === null || this._displayIfBlank === undefined) && this.apiObject) {
				this._displayIfBlank = this.apiObject.displayifblank || false;
			}
			return this._displayIfBlank;
		}

		set displayIfBlank(displayIfBlank: boolean) {
			this._displayIfBlank = displayIfBlank;
		}

		get displayLabel() {
			if (!this._displayLabel && this.label) {
				if (this.showLabelReadOnly) {
					this._displayLabel = this.label;
				} else {
					this._displayLabel = null;
				}
			}
			return this._displayLabel;
		}

		/* get displayValue() {
			if (!this._displayValue && this.value) {
				this._displayValue = this.value;
				if (this.fieldType === 'date' || this.fieldType === 'datetime' || this.fieldType === 'time') {
					if (this.subType === 'Date Only') {
						this._displayValue = moment(this.value).format('MM/DD/YYYY');
					} else if (this.subType === 'Time Only') {
						this._displayValue = moment(this.value).format('hh:mm a');
					} else if (this.subType === 'Anniversary') {
						this._displayValue = moment(this.value).format('MM/DD/YYYY');
					} else if (this.subType === 'Birthday') {
						this._displayValue = moment(this.value).format('MM/DD');
					} else if (this.subType === 'Due Date') {
						this._displayValue = moment(this.value).format('MM/DD/YYYY');
					} else {
						this._displayValue = moment(this.value).format('MM/DD/YYYY hh:mm a');
					}
				} else if (this.fieldType === 'name' && this.value) {
					if (this.subType !== 'Email') {
						if (this._isQualifiedName(this.value)) {
							let name = new Dig.Name(this.value);
							this._displayValue = name.commonName;
						}
					}
				} else if (this.fieldType === 'url' && this.value) {
					if (this.value && this.value.indexOf('http') === -1) {
						this._displayValue = 'http://' + this.value;
					}
				} else if (this.fieldType === 'telephone' && this.value) {
					if (this.value) {
						let regEx = /^\s*(?:\++\ ?(\d{1,3}))?[-. (]*?(\d{3}|\d{1})[-. )]*(\d{3}|\d{2})?[-. ]*(\d{4})[-. ]*(\d{4})?(?:\ *(?:extension|ext|ex|x)?[: ]*?(\d+))?\s*$/;
						let phoneMatch = regEx.exec(this.value);
						this._displayValue = phoneUtils.formatNational(this.value);
					}
				}
			}
			return this._displayValue;
		} */

		/* set displayValue(displayValue: any) {
			if (this.fieldType === 'date' || this.fieldType === 'datetime' || this.fieldType === 'time') {
				this._value = moment(displayValue).toISOString();
			}else {
				this._value = displayValue;
			}
		} */

		get edgeId() {
			if (!this._edgeId && this.apiObject) {
				this._edgeId = this.apiObject['@edgeid'];
			}
			return this._edgeId;
		}

		set edgeId(edgeId: string) {
			this._edgeId = edgeId;
		}

		get fieldInput() {
			if (!this._fieldInput && this.apiObject) {
				this._fieldInput = new Dig.FieldInput();
			}
			if (this._fieldInput && !this._fieldInput.field) {
				this._fieldInput.field = this;
			}
			return this._fieldInput;
		}

		get fieldType() {
			if (!this._fieldType && this.apiObject) {
				if (this.apiObject.type === 'authors' || this.apiObject.type === 'readers') {
					this._fieldType = 'name';
				} else {
					this._fieldType = this.apiObject.type || 'text';
				}
			}
			return this._fieldType;
		}

		set fieldType(fieldType: string) {
			this._fieldType = fieldType || 'text';
		}

		get forensicsType() {
			if (!this._forensicsType && this.apiObject) {
				this._forensicsType = this.apiObject.forensicstype;
			}
			return this._forensicsType;
		}

		set forensicsType(forensicsType: string) {
			this._forensicsType = forensicsType;
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

		get isDisabled() {
			if ((this._disabled === null || this._disabled === undefined) && this.apiObject) {
				this._disabled = this.apiObject['disabled'] || false;
			}
			return this._disabled;
		}

		set isDisabled(disabled: boolean) {
			this._disabled = disabled;
		}

		get isHeader() {
			if ((this._header === null || this._header === undefined) && this.apiObject) {
				this._header = this.apiObject.header || false;
			}
			return this._header;
		}

		set isHeader(isHeader: boolean) {
			this._header = isHeader;
		}

		get isHidden() {
			if ((this._hidden === null || this._hidden === undefined) && this.apiObject) {
				this._hidden = this.apiObject.hidden || false;
			}
			return this._hidden;
		}

		set isHidden(isHidden: boolean) {
			this._hidden = isHidden || false;
		}

		get items() {
			if (!this._items && this.apiObject && this.apiObject.binding) {
				let items = [];
				for (let i = 0; i < this.apiObject.binding.length; i++) {
					let itemObj = this.apiObject.binding[i];
					let item = new Dig.Item(itemObj);
					items.push(item);
				}
				this._items = items;
			}
			return this._items;
		}

		set items(items: Dig.Item[]) {
			this._items = items;
		}

		// TODO: This may have to be it's own type since a label is a vertex
		get label() {
			if (!this._label && this.apiObject && this.apiObject.label) {
				this._label = this.apiObject.label.title;
			}
			return this._label;
		}

		set label(label: string) {
			this._label = label;
		}

		get labelHidden() {
			if ((this._labelHidden === null || this._labelHidden === undefined) && this.apiObject) {
				this._labelHidden = this.apiObject.labelhidden || false;
			}
			return this._labelHidden;
		}

		set labelHidden(labelHidden: boolean) {
			this._labelHidden = labelHidden || false;
		}

		get multiValue() {
			if ((this._multiValue === null || this._multiValue === undefined) && this.apiObject) {
				this._multiValue = this.apiObject.multivalue || false;
			}
			return this._multiValue;
		}

		set multiValue(multiValue: boolean) {
			this._multiValue = multiValue || false;
		}

		get parentCard() {
			return this._parentCard;
		}

		get phoneDialValue() {
			if (!this._phoneDialValue && this.fieldType === 'telephone' && this.value) {
				this._phoneDialValue = phoneUtils.formatE164(this.value);
			}
			return this._phoneDialValue;
		}

		get phoneValue() {
			if (!this._phoneValue && this.fieldType === 'telephone' && this.value) {
				this._phoneValue = phoneUtils.formatInternational(this.value);
			}
			return this._phoneValue;
		}

		set parentCard(parentCard: Dig.Card) {
			this._parentCard = parentCard;
		}

		get required() {
			if ((this._required === null || this._required === undefined) && this.apiObject) {
				this._required = this.apiObject.required === null || this.apiObject.required === false ? false : true;
			}
			return this._required;
		}

		set required(required: boolean) {
			this._required = required || false;
		}

		get showLabelReadOnly() {
			if ((this._showLabelReadOnly === null || this._showLabelReadOnly === undefined) && this.apiObject) {
				if (this.apiObject.showlabelreadonly === null || this.apiObject.showlabelreadonly === undefined) {
					this._showLabelReadOnly = true;
				} else {
					this._showLabelReadOnly = this.apiObject.showlabelreadonly;
				}
			}
			return this._showLabelReadOnly;
		}

		set showLabelReadOnly(showLabelReadOnly: boolean) {
			if (showLabelReadOnly === null || showLabelReadOnly === undefined) {
				this._showLabelReadOnly = true;
			} else {
				this._showLabelReadOnly = showLabelReadOnly;
			}
		}

		get subType() {
			if (!this._subType && this.apiObject) {
				this._subType = this.apiObject.subtype;
				if (this.fieldType === 'name') {
					let subType = this.apiObject.subtype ? this.apiObject.subtype.toLowerCase() : null;
					if (subType === 'authors') {
						this._subType = 'Authors';
					} else if (subType === 'readers') {
						this._subType = 'Readers';
					} else if (subType === 'name') {
						this._subType = 'Name';
					} else if (subType === 'email') {
						this._subType = 'Email';
					}
				}
			}
			// console.log('Dig.Field.getSubType returning', this._subType, 'for', this.label);
			return this._subType;
		}

		set subType(subType: string) {
			this._subType = subType;
		}

		/* get timeValue() {
			// console.log('Dig.Field get.timeValue, dateValue=', this.dateValue);
			let date = null;
			if (!this._timeValue && this.dateValue) {
				date = new Date(this.dateValue).toJSON();
				this._timeValue = date ? moment(date).format('hh:mm a') : null;
			}
			// console.log('Dig.Field.timeValue, returning', this._timeValue);
			return this._timeValue;
		} */

		set timeValue(value) {
			this._timeValue = value;
		}

		get title() {
			if (this.items && this.items.length > 0) {
				this._title = this.items[0].title;
			}
			return this._title;
		}

		get value() {
			if (this.fieldType === 'datetime' || this.fieldType === 'date' || this.fieldType === 'time') {
				this._value = this._value;
			}
			return this._value;
		}

		/* set value(value: any) {
			// console.log('Dig.Field.set value', arguments);
			this._value = value;
			if (this.multiValue) {
				let fieldType = this.fieldType;
				if (value && !Array.isArray(value) && fieldType !== 'datetime' && fieldType !== 'date' && fieldType !== 'time') {
					this._value = this._convertToArray(value);
				}
				if (value && Array.isArray(value)) {
					if (fieldType === 'name' || fieldType === 'readers' || fieldType === 'authors') {
						let newNameArrVal = this._updateNamesArray(this._value);
						this._value = newNameArrVal;
					} else if (fieldType === 'datetime' || fieldType === 'date' || fieldType === 'time') {
						let newDateArrVal = this._updateDatesArray(this._value, fieldType);
						this._value = newDateArrVal;
					}
					let newVal = this._removeEmptyArrayItems(this._value);
					this._value = newVal && newVal.length > 0 ? newVal : this._value;
				}
			}
		} */

		private _convertToArray(value: any) {
			// console.log('Dig.Field._convertToArray', arguments);
			let returnVal = [];
			let splitChar = null;
			if (value && value.indexOf(',') > -1) {
				splitChar = ',';
			} else if (value && value.indexOf(':') > -1) {
				splitChar = ':';
			} else if (value && value.indexOf(';') > -1) {
				splitChar = ';';
			} else if (value && value.indexOf('::') > -1) {
				splitChar = '::';
			} else {
				returnVal = [this._value];
			}
			returnVal = splitChar ? value.split(splitChar) : returnVal;
			return returnVal;
		}

		private _isQualifiedName(nameStr: string): boolean {
			if (nameStr && typeof nameStr === 'string') {
				let abbrName = nameStr.match(/^[a-z ,.'-]+(\/[a-z]+)+$/i) ? true : false;
				let canonicalName = nameStr.match(/^(CN=[a-z ,.'-]+){1}((\/OU=[a-z]+)+)?(\/O=[a-z]+){1}((\/C=[a-z]+){1})?$/i) ? true : false;
				let isName = abbrName || canonicalName ? true : false;
				return isName;
			}
			return false;
		}

		private _removeEmptyArrayItems(valueArr): any[] {
			let newValArr = []
			for (let i = 0; i < valueArr.length; i++) {
				let val = valueArr[i];
				if (val) {
					newValArr.push(val);
				}
			}
			return newValArr;
		}

		/* private _updateDatesArray(datesArr, fieldType) {
			for (let i = 0; i < datesArr.length; i++) {
				let dateVal = datesArr[i];
				if (fieldType === 'datetime') {
					datesArr[i] = moment(dateVal).format('MM/DD/YYYY hh:mm a');
				} else if (fieldType === 'date') {
					datesArr[i] = moment(dateVal).format('MM/DD/YYYY');
				} else if (fieldType === 'time') {
					datesArr[i] = moment(dateVal).format('hh:mm a');
				}
			}
			return datesArr;
		} */

		private _updateNamesArray(namesArr): any[] {
			for (let i = 0; i < namesArr.length; i++) {
				let nameVal = namesArr[i];
				if (this._isQualifiedName(nameVal)) {
					let name = new Dig.Name(nameVal);
					namesArr[i] = name.commonName;
				}
			}
			return namesArr;
		}
	}
}
