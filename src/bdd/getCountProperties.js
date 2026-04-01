const WORKS_API_URL = "http://localhost:5000/countProperties";

export function getCountProperties() {
    return fetch(WORKS_API_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    .then((response) => {
        if(response.status === 200) {
            return response.json();
        }
    });
}