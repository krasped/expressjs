function GotService() {
    this._apiBase = "http://localhost:3000/";

    this.getResource = async function (url = "", token) {
        const json = await fetch(`${this._apiBase}${url}`, {
            method: 'GET', 
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
              })
        }).then((res) =>
            res.json(),
        );
        return json;
    };

    this.postResource = async (data, url = "") => {
        try {
            const response = await fetch(`${this._apiBase}${url}`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let json = await response.json();
            console.log("success", JSON.stringify(json));
            return json;
        } catch (error) {
            console.error("error: ", error);
        }
    };
}

export default GotService;
