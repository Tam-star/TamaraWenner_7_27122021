/*** FONCTIONS API ***/


//New user
export function signUp(request) {
    const url = 'http://localhost:3000/api/users/signup';
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(request)
    }
    return fetch(url, options)
        .then(reponse => reponse.json())
        .catch(error => {
            console.log("Il y a erreur", error)
            error.json()
        })
}

//User logged in
export function login(request) {
    const url = 'http://localhost:3000/api/users/login';
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(request)
    }
    return fetch(url, options)
        .then(reponse => reponse.json())
        .catch(error => {
            console.log("Il y a erreur", error)
            error.json()
        })
}

export function logout() {
    const url = 'http://localhost:3000/api/users/logout';
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        credentials: 'include'
    }
    return fetch(url, options)
        .then(reponse => reponse.json())
        .catch(error => {
            console.log("Il y a erreur", error)
            error.json()
        })
}


export function getUserInfo(id) {
    const url = 'http://localhost:3000/api/users/'+id;
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

export function updateUserWithFormData(formData, id) {
    const url = 'http://localhost:3000/api/users/'+id;
    const options = {
        method: 'PUT',
        credentials: "include",
        body : formData
    }
    return fetch(url, options)
        .then(reponse => reponse.json())
        .catch(err => console.log("Something is wrong : ", err))
}

export function updateUserWithJSON(request, id) {
    const url = 'http://localhost:3000/api/users/'+id;
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



export function deleteUser(id) {
    const url = 'http://localhost:3000/api/users/'+id;
    const options = {
        method: 'DELETE',
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



export function getAllUsers() {
    const url = 'http://localhost:3000/api/users';
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