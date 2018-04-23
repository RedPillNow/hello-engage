namespace Dig {

	export class NameUtils {
		/**
		 * Get the abbreviated name from the fullname field
		 * @param {string[]} fullNameValArr the value of the fullname field from the person document
		 */
		static getCanonicalFromFullName(fullNameValArr: string[]) {
			let canonicalName = null;
			if (fullNameValArr && fullNameValArr.length > 0) {
				let canonicalRegEx = /^(CN=[a-z ,.'-]+){1}((\/OU=[a-z0-9\-_]+)+)?(\/O=[a-z0-9\-_]+){1}((\/C=[a-z]+){1})?$/i;
				canonicalName = fullNameValArr.find((nameStr, idx, arr) => {
					return canonicalRegEx.test(nameStr);
				});
			}
			return canonicalName;
		}

		static getNameType(nameStr: string): string {
			let returnVal = "Not Name";
			if (nameStr) {
				let abbrName: boolean = nameStr.match(/^[a-z0-9\-_ ,.'-]+([/a-z0-9\-_])+$/i) ? true : false;
				let canonicalName: boolean = nameStr.match(/^(CN=[a-z ,.'-]+){1}((\/OU=[a-z0-9\-_]+)+)?(\/O=[a-z0-9\-_]+){1}((\/C=[a-z]+){1})?$/i) ? true : false;
				if (abbrName) {
					returnVal = 'abbreviated';
				} else if (canonicalName) {
					returnVal = 'canonical';
				}
			}
			return returnVal;
		}

		//TODO - This doesn't take into account a Country
		static _getFullNameFromAbbr(abbrName) {
			let nameArr = abbrName.split('/');
			let lastNameMember = nameArr.pop();
			let hasOu = false;
			let nameStr = 'CN=' + nameArr[0];
			for (let i = 1; i < nameArr.length; i++) {
				let nameMem = nameArr[i];
				if (nameMem !== lastNameMember) {
					nameStr += '/OU=' + nameMem;
				}
			}
			nameStr += '/O=' + lastNameMember;
			return nameStr;
		}
	};

	// TODO: Move to now-core (replace/combine with DominoName)
	export class Name {
		private _abbreviatedName: string;
		private _backgroundColor: string;
		private _commonName: string;
		private _contrastingColor: string;
		private _firstName: string;
		private _firstNameLetter: string;
		private _fullName: string;
		private _lastName: string;
		private _lastNameLetter: string;

		constructor(name: string) {
			let nameType = Dig.NameUtils.getNameType(name);
			if (nameType === 'canonical') {
				this._fullName = name;
			} else if (nameType === 'abbreviated') {
				this._abbreviatedName = name;
				this._fullName = Dig.NameUtils._getFullNameFromAbbr(name);
			}
		}

		get canonicalName() {
			return this._fullName;
		}

		set canonicalName(fullName: string) {
			this._fullName = fullName;
		}

		get abbreviatedName() {
			if (this.canonicalName) {
				let fullNameArr = this.canonicalName.split('/');
				for (let i = 0; i < fullNameArr.length; i++) {
					let tempVar = fullNameArr[i].toLowerCase();
					if (i === 0) {
						this._abbreviatedName = fullNameArr[i].substring(tempVar.indexOf('=') + 1);
					}else {
						this._abbreviatedName += '/' + fullNameArr[i].substring(tempVar.indexOf('=') + 1);
					}
				}
			}
			return this._abbreviatedName;
		}

		get commonName() {
			if (this.canonicalName && this.canonicalName.length > 0) {
				let fullNameArr = this.canonicalName.split('/');
				for (let i = 0; i < fullNameArr.length; i++) {
					let tempVar = fullNameArr[i].toLowerCase();
					if (tempVar.indexOf('cn=') === 0) {
						this._commonName = fullNameArr[i].substring(3);
					}
				}
			}
			return this._commonName;
		}

		get backgroundColor() {
			let hash = 0;
			if (this.canonicalName) {
				for (let i = 0; i < this.canonicalName.length; i++) {
					hash = this.canonicalName.charCodeAt(i) + ((hash << 5) - hash);
				}
			}
			let colour = '#';
			for (let j = 0; j < 3; j++) {
				let value = (hash >> (j * 8)) & 0xFF;
				let valueStr = value.toString(16);
				let hexColor = ('f3' + valueStr).substr(-2);
				colour += hexColor;
			}
			this._backgroundColor = colour;
			return this._backgroundColor;
		}

		/* get contrastingColor() {
			if (!this._contrastingColor && this.backgroundColor) {
				this._contrastingColor = tinycolor(this.backgroundColor).isLight() ? '#000' : '#fff';
			}
			return this._contrastingColor;
		} */

		get firstName() {
			if (!this._firstName && this.commonName) {
				let firstSpaceIdx = this.commonName.indexOf(' ');
				this._firstName = this.commonName.substring(0, firstSpaceIdx);
			}
			return this._firstName;
		}

		get firstNameLetter() {
			if (!this._firstNameLetter && this.commonName) {
				this._firstNameLetter = this.commonName.substring(0, 1).toUpperCase();
			}
			return this._firstNameLetter;
		}

		get lastName() {
			if (!this._lastName && this.commonName) {
				let lastSpaceIdx = this.commonName.lastIndexOf(' ') + 1;
				this._lastName = this.commonName.substring(lastSpaceIdx);
			}
			return this._lastName;
		}

		get lastNameLetter() {
			if (!this._lastNameLetter && this.commonName) {
				this._lastNameLetter = this.commonName.substring(this.commonName.lastIndexOf(' ') + 1, this.commonName.lastIndexOf(' ') + 2);
			}
			return this._lastNameLetter;
		}
	}
}
