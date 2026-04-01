export function getEquipments(id) {
    const WORKS_API_URL = "http://localhost:5000/properties/" + id + "/equipments";

    return fetch(WORKS_API_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    .then((response) => {
        if(response.status === 200) {
            return response.json();
        }
    })
    .then((data) => {
        return data.map((equipments) => equipments.label)
    })
}