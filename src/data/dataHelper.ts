import * as rpTypes from '../commons/types';
import {DataRequest} from '../commons/xhrRequest';
import * as moment from 'moment'

export class DataHelper {

	static getSessionsData() {
		let opts: rpTypes.XhrOptions = {
			method: 'GET',
			uri: 'https://engage.ug/engage.nsf/BLUGViewSessions?readviewentries&OutputFormat=JSON&count=100',
			resolveFullResponse: true,
			json: true
		}
		return DataRequest.doRequest(opts);
	}

	static getEntryValue(entry: rpTypes.ViewEntry, colName: string, speech?): any {
		let column: rpTypes.ViewEntryColumn = entry.entrydata.find((col: rpTypes.ViewEntryColumn, idx, arr) => {
			if (colName) {
				return col['@name'] === colName;
			}
			return false;
		});
		if (column && column.datetime) {
			let dateTimeStr = column.datetime[0];
			if (colName === 'session_date') {
				let time = this.getEntryValue(entry, 'session_time1');
				let unformatTime = time.replace(':','');
				dateTimeStr = dateTimeStr + 'T' + unformatTime;
				if (speech) {
					dateTimeStr = DataHelper.getDateText(dateTimeStr, new Date('5/21/2018'));
				}
				return dateTimeStr;
			}
		}else if (column && column.text) {
			return column.text[0];
		}
		return null;
	}

	static getDateText(dateTimeStr, refDate?) {
		// console.log('DataHelper.getDateText, dateTimeStr=', dateTimeStr);
		let evtMoment: moment.Moment = moment(dateTimeStr);
		let evtCal = evtMoment.calendar();
		if (refDate) {
			evtCal = evtMoment.calendar(refDate)
		}
		// console.log('DataHelper.getDateText, evtCal=', evtCal);
		let dateTimeArr = evtCal.split(' ');
		dateTimeArr.splice(2, 0, '<say-as interpret-as="time">');
		dateTimeArr.push('</say-as>');
		let dateTimeText = dateTimeArr.join(' ');
		// console.log('DataHelper.getDateText returning', dateTimeText);
		return dateTimeText;
	}

}
