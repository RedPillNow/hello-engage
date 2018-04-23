namespace Dig {
	export class Comment extends Dig.Vertex {
		private _body: string;
		private _user: Dig.Person;
		private _created: string;

		constructor(apiObject) {
			super(apiObject);
		}

		get body() {
			if (!this._body && this.apiObject) {
				this._body = this.apiObject.body;
			}
			return this._body;
		}

		set body(body) {
			this._body = body;
		}

		/* get created() {
			let createdDate = moment(this.createdDate);
			let today = moment(new Date());
			let diff = createdDate.diff(today, 'days');
			// console.log('Dig.Comment.created, diff=', diff);
			if (diff >= -4) {
				return moment(this.createdDate).fromNow();
			} else {
				return moment(this.createdDate).format('hh:mm A  DD MMM YYYY');
			}
		} */

		get user() {
			if (!this._user && this.apiObject && this.apiObject['#commentsonin']) {
				if (this.apiObject['#commentsonin'].length > 0) {
					this._user = new Dig.Person(this.apiObject['#commentsonin'][0]);
				}
			}
			return this._user;
		}

		set user(user: Dig.Person) {
			this._user = user;
		}

	}
}
