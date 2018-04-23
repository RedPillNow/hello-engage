import * as rp from 'request-promise';
import * as rpTypes from './types';

export class DataRequest {

	static doRequest(options: rpTypes.XhrOptions): Promise<any> {
		options.json = options.json == null || options.json === undefined ? true : options.json;
		options.method = options.method || 'GET';
		options.headers = options.headers || {};
		options.resolveFullResponse = options.resolveFullResponse === null || options.resolveFullResponse === undefined ? true : options.resolveFullResponse;
		if (options.userName && options.password && !options.headers.Authorization) {
			options.headers.Authorization = 'Basic a2VpdGggc3RyaWNrbGFuZDp0ZXN0MTIz';
			options.headers['User-Agent'] = options.headers['User-Agent'] ? options.headers['User-Agent'] : 'Request-Promise';
		}
		return rp(options);
	}

}
