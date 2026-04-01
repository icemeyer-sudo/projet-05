export function getTags(id) {
    const WORKS_API_URL = "http://localhost:5000/properties/c67ab8a7/tags";

    return fetch(WORKS_API_URL)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data.map((tags) => tags.label)
    })
}