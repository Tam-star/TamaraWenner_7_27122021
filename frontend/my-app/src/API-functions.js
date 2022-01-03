/*** FONCTIONS API ***/


//New user
export function signUp(request) {
    const url = 'http://localhost:3000/api/users';
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
        .catch(err => console.log("Il y a erreur", err))
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
