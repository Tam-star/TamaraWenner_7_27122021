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

//New user
export function login(request) {
    const url = 'http://localhost:3000/api/users/login';
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


function getAllPosts() {
    const url = 'http://localhost:3000/api/posts';
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    }
    return fetch(url, options)
        .then(reponse => reponse.json())
        .catch(err => console.log("Something is wrong : ", err))
}
