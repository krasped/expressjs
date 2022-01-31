function GotService() {
    this._apiBase = "http://localhost:3000/users/";

    this.getResource = async function (url = "") {
        const json = await fetch(`${this._apiBase}${url}`).then((res) =>
            res.json(),
        );
        if (url === "user") {
            return JSON.stringify(json);
        } else {
            return json;
        }
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
        } catch (error) {
            console.error("error: ", error);
        }
    };
}

export default GotService;
