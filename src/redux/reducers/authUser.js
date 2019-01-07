import cloneDeep from 'lodash.clonedeep'

const initialState = {
    user: {},
    isAuth: false
}

export default (state = initialState, { type, user, field, value }) => {
    switch (type) {
        case 'SET_USER':
            return {
                user,
                isAuth: !!Object.keys(user).length
            }
        case 'EDIT_USER': {
            const { user } = state
            user[field] = value

            return {
                user: cloneDeep(user),
                isAuth: state.isAuth
            }
        }
        default: return state
    }
}