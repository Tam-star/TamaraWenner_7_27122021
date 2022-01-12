export function getAllCommentsOfPost(postId) {
    const url = 'http://localhost:3000/api/comments/'+postId+'/all';
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

export function getOneComment(commentId) {
    const url = 'http://localhost:3000/api/comments/'+commentId;
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


// export function createPostWithFormData(formData) {
//     const url = 'http://localhost:3000/api/posts';
//     const options = {
//         method: 'POST',
//         credentials: "include",
//         body : formData
//     }
//     return fetch(url, options)
//         .then(reponse => reponse.json())
//         .catch(err => console.log("Something is wrong : ", err))
// }

export function createCommentWithJSON(request) {
    const url = 'http://localhost:3000/api/comments';
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


// export function updatePostWithFormData(formData, id) {
//     const url = 'http://localhost:3000/api/posts/'+id;
//     const options = {
//         method: 'PUT',
//         credentials: "include",
//         body : formData
//     }
//     return fetch(url, options)
//         .then(reponse => reponse.json())
//         .catch(err => console.log("Something is wrong : ", err))
// }

export function updateCommentWithJSON(request, commentId) {
    const url = 'http://localhost:3000/api/comments/'+commentId;
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


export function deleteComment(commentId) {
    const url = 'http://localhost:3000/api/comments/'+commentId;
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
