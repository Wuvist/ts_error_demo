import axios from 'axios';

interface ok {
	msg: string;
}

interface err {
	err: string;
}

async function doAsync<T>(): Promise<T> {
	let resp = await axios.get('http://localhost:8000/ok.json', {
		transformResponse: [function transformResponse(data) {
			return data;
		}]
    })
        
    try {
        const r: T = <T>JSON.parse(resp.data);
        return r;
    } catch (e) {
        throw {
            msg: "decode error",
            data: resp.data,
            error: e
        };
    }
}

async function t() {
    try {
        let r = await doAsync<ok>();
        console.log(r.msg);
    } catch(err){
        console.log(err);
    } 
}

t();
