declare var md5: any;
namespace Dig {
	export class Person extends Dig.Vertex {
		private _assistant: Dig.Name;
		private _backgroundColor: string;
		private _cellPhoneNumber: string;
		private _city: string;
		private _companyName: string;
		private _contrastingColor: string;
		private _country: string;
		private _department: string;
		private _description: string;
		private _employeeId: string;
		private _favorites: Dig.Vertex[];
		private _feedbacks: any[];
		private _firstName: string;
		private _fullName: Dig.Name;
		private _hiddenItems: any[];
		private _isAdmin: boolean;
		private _jobTitle: string;
		private _lastName: string;
		private _location: string;
		private _mailAddress: string;
		private _middleInitial: string;
		private _manager: Dig.Name;
		private _name: string;
		private _officeCity: string;
		private _officeCountry: string;
		private _officePhoneNumber: string;
		private _officeState: string;
		private _officeStreetAddress: string;
		private _officeZip: string;
		private _personAvatarUrl: string;
		private _phoneNumber: string;
		private _photoUrl: string;
		private _roles: string[];
		private _state: string;
		private _streetAddress: string;
		private _savedSearches: Dig.SavedSearch[];
		private _zip: string;

		constructor(apiObject: any, fullName?: string) {
			super(apiObject);
			this._fullName = fullName ? new Dig.Name(fullName) : this._fullName;
		}

		setApiObject(apiObject: any) {
			super.setApiObject(apiObject);
			if (apiObject) {
				let canonicalNameStr = Dig.NameUtils.getCanonicalFromFullName(apiObject.fullname);
				this._fullName = canonicalNameStr ? new Dig.Name(canonicalNameStr) : null;
				this._lastName = apiObject.lastname;
				this._firstName = apiObject.firstname;
			}
		}

		get description() {
			if (!this._description && this.apiObject && this.apiObject.description) {
				this._description = this.apiObject.description;
			} else if (!this._description) {
				//this._description = 'Ask me to update my status';
				this._description = '';
			}
			return this._description;
		}

		set description(description: string) {
			this._description = description;
		}

		get officeZip() {
			if (!this._officeState) {
				if (this.apiObject && this.apiObject.officezip) {
					this._officeZip = this.apiObject.officezip;
				}
			}
			if (!this._officeZip) {
				this._officeZip = '';
			}
			return this._officeZip;
		}

		set officeZip(officeZip: string) {
			this._officeZip = officeZip;
		}

		get officeStreetAddress() {
			if (!this._officeStreetAddress) {
				if (this.apiObject && this.apiObject.officestreetaddress) {
					this._officeStreetAddress = this.apiObject.officestreetaddress;
				}
			}
			return this._officeStreetAddress || null;
		}

		set officeStreetAddress(officeStreetAddress: string) {
			this._officeStreetAddress = officeStreetAddress;
		}

		get officeState() {
			if (!this._officeState) {
				if (this.apiObject && this.apiObject.officestate) {
					this._officeState = this.apiObject.officestate;
				}
			}
			return this._officeState || null;
		}

		set officeState(officeState: string) {
			this._officeState = officeState;
		}

		get officeCity() {
			if (!this._officeCity) {
				if (this.apiObject && this.apiObject.officecity) {
					this._officeCity = this.apiObject.officecity;
				}
			}
			return this._officeCity || null;
		}

		set officeCity(officeCity: string) {
			this._officeCity = officeCity;
		}

		get officeCountry() {
			if (!this._officeCountry) {
				if (this.apiObject && this.apiObject.officecountry) {
					this._officeCountry = this.apiObject.officecountry;
				}
			}
			return this._officeCountry || null;
		}

		set officeCountry(officeCountry: string) {
			this._officeCountry = officeCountry;
		}

		get backgroundColor() {
			if (!this._backgroundColor && this.fullName) {
				this._backgroundColor = this.fullName.backgroundColor;
			}
			return this._backgroundColor;
		}

		/* get contrastingColor() {
			if (!this._contrastingColor && this.fullName) {
				this._contrastingColor = this.fullName.contrastingColor;
			}
			return this._contrastingColor;
		} */

		get fullName() {
			if (!this._fullName) {
				if (this.apiObject && this.apiObject.fullname && this.apiObject.fullname.length > 0) {
					let canonicalName = Dig.NameUtils.getCanonicalFromFullName(this.apiObject.fullname);
					this._fullName = new Dig.Name(canonicalName);
				} else if (this.apiObject['$$key']) {
					this._fullName = new Dig.Name(this.apiObject['$$key']);
				}
			}
			return this._fullName;
		}

		get assistant() {
			if (!this._assistant) {
				if (this.apiObject && this.apiObject.assistant) {
					this._assistant = new Dig.Name(this.apiObject.assistant);
				}
			}
			return this._assistant;
		}

		set assistant(assistant: any) {
			if (assistant instanceof String) {
				this._assistant = new Dig.Name(<string> assistant);
			} else if (assistant instanceof Dig.Name) {
				this._assistant = assistant;
			}
		}

		get manager() {
			if (!this._manager) {
				if (this.apiObject && this.apiObject.manager) {
					this._manager = new Dig.Name(this.apiObject.manager);
				}
			}
			return this._manager;
		}

		set manager(manager: any) {
			if (manager instanceof String) {
				this._manager = new Dig.Name(<string> manager);
			} else if (manager instanceof Dig.Name) {
				this._manager = manager;
			}
		}

		get country() {
			if (!this._country) {
				if (this.apiObject && this.apiObject.country) {
					this._country = this.apiObject.country;
				}
			}
			return this._country || null;
		}

		set country(country: string) {
			this._country = country;
		}

		get city() {
			if (!this._city && this.apiObject && this.apiObject.city) {
				this._city = this.apiObject.city;
			}
			return this._city || null;
		}

		set city(city: string) {
			this._city = city;
		}

		get state() {
			if (!this._state && this.apiObject && this.apiObject.state) {
				this._state = this.apiObject.state;
			}
			return this._state || null;
		}

		set state(state: string) {
			this._state = state;
		}

		get streetAddress() {
			if (!this._streetAddress && this.apiObject && this.apiObject.streetaddress) {
				this._streetAddress = this.apiObject.streetaddress;
			}
			return this._streetAddress || null;
		}

		set streetAddress(streetAddress: string) {
			this._streetAddress = streetAddress;
		}

		get location() {
			if (!this._location && this.apiObject && this.apiObject.location) {
				this._location = this.apiObject.location;
			}
			return this._location || null;
		}

		set location(location: string) {
			this._location = location;
		}

		get lastName() {
			if (!this._lastName && this.fullName && this.apiObject) {
				if (this.apiObject.lastname) {
					this._lastName = this.apiObject.lastname;
				}else if (this.fullName) {
					this._lastName = this.fullName.lastName;
				}
			}
			return this._lastName;
		}

		set lastName(lastName: string) {
			this._lastName = lastName;
		}

		get firstName() {
			if (!this._firstName && this.fullName && this.apiObject) {
				if (this.apiObject.firstname) {
					this._firstName = this.apiObject.firstname;
				}else if (this.fullName) {
					this._firstName = this.fullName.firstName;
				}
			}
			return this._firstName;
		}

		set firstName(firstName: string) {
			this._firstName = firstName;
		}

		get employeeId() {
			if (!this._employeeId && this.apiObject && this.apiObject.employeeid) {
				this._employeeId = this.apiObject.employeeid;
			} else if (!this._employeeId && this.apiObject && this.apiObject.employeenumber) {
				this._employeeId = this.apiObject.employeenumber;
			}
			return this._employeeId;
		}

		set employeeId(employeeId: string) {
			this._employeeId = employeeId;
		}

		get companyName() {
			if (!this._companyName && this.apiObject && this.apiObject.companyname) {
				this._companyName = this.apiObject.companyname;
			}
			return this._companyName;
		}

		set companyName(companyName: string) {
			this._companyName = companyName;
		}

		get cellPhoneNumber() {
			if (!this._cellPhoneNumber && this.apiObject && this.apiObject.cellphonenumber) {
				this._cellPhoneNumber = this.apiObject.cellphonenumber;
			}
			return this._cellPhoneNumber;
		}

		set cellPhoneNumber(cellPhoneNumber: string) {
			this._cellPhoneNumber = cellPhoneNumber;
		}

		get jobTitle() {
			if (!this._jobTitle && this.apiObject && this.apiObject.jobtitle) {
				this._jobTitle = this.apiObject.jobtitle;
			}
			return this._jobTitle;
		}

		set jobTitle(jobTitle: string) {
			this._jobTitle = jobTitle;
		}

		get department() {
			if (!this._department && this.apiObject && this.apiObject.department) {
				this._department = this.apiObject.department;
			}
			return this._department;
		}

		set department(department: string) {
			this._department = department;
		}

		get middleInitial() {
			if (!this._middleInitial && this.apiObject && this.apiObject.middleinitial) {
				this._middleInitial = this.apiObject.middleinitial;
			}
			return this._middleInitial;
		}

		set middleInitial(middleInitial: string) {
			this._middleInitial = middleInitial;
		}

		get officePhoneNumber() {
			if (!this._officePhoneNumber && this.apiObject && this.apiObject.officephonenumber) {
				this._officePhoneNumber = this.apiObject.officephonenumber;
			}
			return this._officePhoneNumber;
		}

		set officePhoneNumber(officePhoneNumber: string) {
			this._officePhoneNumber = officePhoneNumber;
		}

		get phoneNumber() {
			if (!this._phoneNumber && this.apiObject && this.apiObject.phonenumber) {
				this._phoneNumber = this.apiObject.phonenumber;
			}
			return this._phoneNumber;
		}

		set phoneNumber(phoneNumber: string) {
			this._phoneNumber = phoneNumber;
		}

		get photoUrl() {
			if (!this._photoUrl && this.apiObject && this.apiObject.photourl) {
				this._photoUrl = this.apiObject.photourl;
			} else if (!this._photoUrl && this.apiObject && this.apiObject.mailaddress) {
				let hash = md5(this.apiObject.mailaddress);
				this._photoUrl = 'http://www.gravatar.com/avatar/' + hash +'?d=404';
			}
			return this._photoUrl;
		}

		set photoUrl(photoUrl: string) {
			this._photoUrl = photoUrl;
		}

		get zip() {
			if (!this._zip && this.apiObject && this.apiObject.zip) {
				this._zip = this.apiObject.zip;
			}
			if (!this._zip) {
				this._zip = '';
			}
			return this._zip;
		}

		set zip(zip: string) {
			this._zip = zip;
		}

		get mailAddress() {
			if (!this._mailAddress && this.apiObject && this.apiObject.mailaddress) {
				this._mailAddress = this.apiObject.mailaddress || null;
			}
			return this._mailAddress;
		}

		set mailAddress(mailAddress: string) {
			this._mailAddress = mailAddress;
		}

		get favorites() {
			if (!this._favorites && this.apiObject && this.apiObject['#favorites']) {
				let favs = this.apiObject['#favorites'];
				let favVertices = [];
				for (let i = 0; i < favs.length; i++) {
					let fav = favs[i];
					let vert = null;
					if (fav['@type'].indexOf('Application') > -1) {
						vert = new Dig.Application(fav);
					} else if (fav['@type'].indexOf('Listing') > -1) {
						vert = new Dig.Listing(fav);
					} else if (fav['@type'].indexOf('Fact') > -1) {
						vert = new Dig.Document(fav);
					} else {
						vert = new Dig.Vertex(favs[i]);
					}
					favVertices.push(vert);
				}
				this._favorites = favVertices;
			}
			return this._favorites;
		}

		set favorites(favorites: any[]) {
			this._favorites = favorites;
		}

		get hiddenItems() {
			if (!this._hiddenItems && this.apiObject && this.apiObject['#hides']) {
				this._hiddenItems = this.apiObject['#hides'];
			}
			return this._hiddenItems;
		}

		set hiddenItems(hiddenItems: any[]) {
			this._hiddenItems = hiddenItems;
		}

		get feedbacks() {
			if (!this._feedbacks && this.apiObject && this.apiObject['#from']) {
				let apiFeedbacks = this.apiObject['#from'];
				if (apiFeedbacks && apiFeedbacks.length > 0 && apiFeedbacks[0] instanceof Dig.Feedback) {
					this._feedbacks = apiFeedbacks;
				} else if (apiFeedbacks && apiFeedbacks.length > 0) {
					let feedbacks = [];
					for (let i = 0; i < apiFeedbacks.length; i++) {
						let feedback = new Dig.Feedback(apiFeedbacks[i]);
						feedbacks.push(feedback);
					}
					feedbacks.sort(function (a: Dig.Feedback, b: Dig.Feedback) {
						return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
					})
					this._feedbacks = feedbacks;
				}
			}
			return this._feedbacks;
		}

		set feedbacks(feedbacks: any[]) {
			if (feedbacks && feedbacks.length > 0 && feedbacks[0] instanceof Dig.Feedback) {
				this._feedbacks = feedbacks;
			} else if (feedbacks && feedbacks.length > 0) {
				let feedbacksArr = [];
				for (let i = 0; i < feedbacks.length; i++) {
					let feedback = new Dig.Feedback(feedbacks[i]);
					feedbacksArr.push(feedback);
				}
				this._feedbacks = feedbacksArr;
			} else {
				this._feedbacks === feedbacks;
			}
		}

		get savedSearches(): SavedSearch[] {
			if (!this._savedSearches && this.apiObject && this.apiObject['#saves']) {
				let apiSearches = this.apiObject['#saves'];
				if (apiSearches && apiSearches.length > 0 && apiSearches[0] instanceof Dig.SavedSearch) {
					this._savedSearches = apiSearches;
				} else if (apiSearches && apiSearches.length > 0) {
					let searches = [];
					for (let i = 0; i < apiSearches.length; i++) {
						let feedback = new Dig.SavedSearch(apiSearches[i]);
						searches.push(feedback);
					}
					this._savedSearches = searches;
				}
			}
			return this._savedSearches;
		}

		set searches(searches: any[]) {
			if (searches && searches.length > 0 && searches[0] instanceof Dig.SavedSearch) {
				this._savedSearches = searches;
			} else if (searches && searches.length > 0) {
				let searchesArr = [];
				for (let i = 0; i < searches.length; i++) {
					let feedback = new Dig.SavedSearch(searches[i]);
					searchesArr.push(feedback);
				}
				this._savedSearches = searchesArr;
			} else {
				this._savedSearches === searches;
			}
		}


		get isAdmin() {
			if ((this._isAdmin === null || this._isAdmin === undefined) &&
					this.apiObject && this.apiObject['isrpnadmin']) {
				this._isAdmin = this.apiObject['isrpnadmin'] === true || this.apiObject['isrpnadmin'] === 1 ? true : false;
			} else if (this._isAdmin === null || this._isAdmin === undefined) {
				this._isAdmin = false;
			}
			return this._isAdmin;
		}

		set isAdmin(isAdmin: boolean) {
			this._isAdmin = isAdmin;
		}

		get name() {
			return this.fullName.canonicalName;
		}

		get roles() {
			return this._roles;
		}
	}
}
