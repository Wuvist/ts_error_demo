import axios from 'axios';

interface ok {
    getName(): string | null;
    msg: string | undefined;
}

interface err {
    err: string;
}

function doPromise<T>(): Promise<T> {
	return axios.get('http://localhost:8000/ok.json', {
		transformResponse: [function transformResponse(data) {
			return data;
		}]
	}).catch(err => {
		console.log("catched")
		return Promise.reject(err);
	}).then(resp => {
		try {
            let r: T = JSON.parse(resp.data);
            return Promise.resolve(r);
		} catch (e) {
			return Promise.reject({
				msg: "decode error",
				data: resp.data,
				error: e
			})
		}
	});
}

function isOK(object: any): object is ok {
    const myInterface = object as ok;
    return myInterface.getName !== undefined;
}

function t() {
	doPromise<ok>().then(r => {
        console.log("then", isOK(r));
		console.log(r.msg);
	}).catch(err => {
		console.log("catch");
		console.log(err);
	})
}

t();
