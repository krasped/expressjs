function GotService() {
    this._apiBase = 'http://localhost:3000/users/';

    this.getResource = async function (url = '') {
        const res = await fetch(`${this._apiBase}${url}`);
        let json = await res.json();
        if (!res.ok){
            throw new Error ("could not fetch ");// ловим ошибки 
        }
        if(url === 'user'){
            return JSON.stringify(json);
        } else {
            return json;
        }
    }

    this.postResource = async (data, url = '') => {
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

export default GotService;


