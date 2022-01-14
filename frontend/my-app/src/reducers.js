export function profileReducer(state, action) {
    switch (action.type) {
        case 'lastname':
            return { ...state, lastname: action.payload }
        case 'firstname':
            return { ...state, firstname: action.payload };
        case 'pseudo':
            return { ...state, pseudo: action.payload };
        case 'email':
            return { ...state, email: action.payload };
        case 'bio':
            return { ...state, bio: action.payload };
        case 'password':
            return { ...state, password: action.payload };
        default:
            throw new Error("Cette action n'est pas prévue")
    }
}