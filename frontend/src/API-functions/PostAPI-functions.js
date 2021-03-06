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

export function getOnePost(id) {
    const url = 'http://localhost:3000/api/posts/'+id;
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

export function getAllPostsOfUser(userId) {
    const url = 'http://localhost:3000/api/posts?userId='+userId;
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


export function updatePostWithFormData(formData, id) {
    const url = 'http://localhost:3000/api/posts/'+id;
    const options = {
        method: 'PUT',
        credentials: "include",
        body : formData
    }
    return fetch(url, options)
        .then(reponse => reponse.json())
        .catch(err => console.log("Something is wrong : ", err))
}

export function updatePostWithJSON(request, id) {
    const url = 'http://localhost:3000/api/posts/'+id;
    const options = {
        method: 'PUT',
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





export function likePost(request, id) {
    console.log('like sending')
    //alert('like sending')
    const url = 'http://localhost:3000/api/posts/'+id+'/like';
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
