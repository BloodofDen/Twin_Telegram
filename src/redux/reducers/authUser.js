const initialState = {
    user: {},
    isAuth: false
}

export default (state = initialState, { type, user }) => {
    switch (type) {
        case 'SET_USER':
            return {
                user,
                isAuth: !!Object.keys(user).length
            }
        default: return state
    }
}