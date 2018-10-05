import axios from 'axios';

interface ok {
	msg: string;
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
		let r: T;

		try {
			r = JSON.parse(resp.data);
		} catch (e) {
			return Promise.reject({
				msg: "decode error",
				data: resp.data,
				error: e
			})
		}
		return Promise.resolve(r);
	});
}

function t() {
	doPromise<ok>().then(r => {
		console.log("then");
		console.log(r.msg);
	}).catch(err => {
		console.log("catch");
		console.log(err);
	})
}

t();

function foo(ok: boolean): Promise<string> {
	return new Promise(function (resolve, reject) {
		if (ok) {
			console.log("foo resolve");
			resolve("foo ok");
		} else {
			console.log("foo reject");
			reject("foo reject")
		}
	});
}

function bar(ok: boolean): Promise<string> {
	return foo(ok).then(r => {
		console.log("bar resolve", r);
		if(ok) {
			return Promise.resolve("bar ok");
		}
		return Promise.reject("bar reject");
	}).catch(err => {
		console.log("bar catch", err);
		return "bar catched";
	});
}

function foobar() {
	bar(false).then(resp => {
		console.log("foobar then", resp);
	}).catch(err => {
		console.log("foobar catch", err);
	})
}

// foobar()
