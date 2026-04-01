const WORKS_API_URL = "http://localhost:5000/properties";

export function getProperties(page) {
    if(!page) {
        return fetch(WORKS_API_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            if(response.status === 200) {
                return response.json();
            }
        });
    } else {
        return fetch(WORKS_API_URL + "/page/" + page, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            if(response.status === 200) {
                return response.json();
            }
        });
    }
}