export function getAllPosts() {
    const url = 'http://localhost:3000/api/posts';
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        credentials: "include"
    }
    return fetch(url, options)
        .then(reponse => reponse.json())
        .catch(err => console.log("Something is wrong : ", err))
}


export function createPostWithFormData(formData) {
    const url = 'http://localhost:3000/api/posts';
    const options = {
        method: 'POST',
        credentials: "include",
        body : formData
    }
    return fetch(url, options)
        .then(reponse => reponse.json())
        .catch(err => console.log("Something is wrong : ", err))
}

export function createPostWithJSON(request) {
    const url = 'http://localhost:3000/api/posts';
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        credentials: "include",
        body : JSON.stringify(request)
    }
    return fetch(url, options)
        .then(reponse => reponse.json())
        .catch(err => console.log("Something is wrong : ", err))
}

export function deletePost(id) {
    const url = 'http://localhost:3000/api/posts/'+id;
    const options = {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        credentials: "include"
    }
    return fetch(url, options)
        .then(reponse => reponse.json())
        .catch(err => console.log("Something is wrong : ", err))
}
