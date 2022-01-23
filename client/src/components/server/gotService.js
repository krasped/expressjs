export default class GotService {
    constructor(){
        this._apiBase = 'http://localhost:3000/users/';
    }

    async getResource (url = '') {
        const res = await fetch(`${this._apiBase}${url}`);
        console.log(res);
        let json = await res.json();
        if (!res.ok){
            throw new Error ("could not fetch ");// ловим ошибки 
        }
        if(url === 'update'){
            return JSON.stringify(json);
        } else {
            return json;
        }
    }

    postResource = async (data, url = '') => {
        console.log(data);
        try {
            const response = await fetch(`${this._apiBase}${url}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let json = await response.json();
            console.log("success", JSON.stringify(json));
        } catch (error) {
            console.error("error: ", error);
        }
    }
}

