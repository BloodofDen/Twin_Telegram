import axios from 'axios'

const url = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:5000/api/'

export const signInUser = async ({ name, password }) => {
    try {
        const { data } = await axios.post(`${url}user/logIn`, { name, password })        
        localStorage.setItem('Auth', JSON.stringify(data))
        
        return data
    } catch (e) {
        return null
    }
}

export const sendMessage = messageData => axios.post(`${url}addMessage`, messageData)
    .then(({ data }) => data)

export const readMessage = (userId, conversationId) => axios.post(`${url}readMessage`, { userId, conversationId })

export const getConversationInfo = (userId, conversationId) => axios.post(`${url}conversationInfo`, { userId, conversationId })
    .then(({ data }) => data)

export const signUpUser = async (userData) => {
    const res = await axios.post(`${url}user/signUp`, userData)

    if(res && res.status === 200) {
        const user = res.data
        localStorage.setItem('Auth', JSON.stringify(user))

        return user
    }

    return null
}

export const getConversation = async (userId, conversationId) => {
    try {
        const { data } = await axios.get(`${url}user/${userId}/conversation/${conversationId}`)   
        
        return data
    } catch (e) {
        return null
    }
}

export const createConversation = async (userId, companionsIds, conversationData = {}) => {
    const res = await axios.post(`${url}user/${userId}/createConversation`, {
        companionsIds,
        conversationData
    })

    if(res && res.status === 200) {
        return res.data
    }

    return null
}

export const getConversations = async (userId) => {
    const res = await axios.get(`${url}user/${userId}/conversations`)

    if(res && res.status === 200) {
        return res.data
    }

    return null
}

export const searchForUsers = async (curUserId, queryStr, conversationsIds) => {
    const res = await axios.post(
        `${url}user/${curUserId}/searchUsers`,
        {
            queryStr,
            conversationsIds
        }
    )

    if(res && res.status === 200) {
        return res.data
    }

    return null
}

export const getUser = userId => axios.get(`${url}user/${userId}`)
    .then(({ data }) => data)

export const editUser = (userId, label, data) => axios.post(`${url}user/edit`, { userId, label, data })
    .then(userId => userId)

export const fetchMessage = (userId, messageId) => axios.post(`${url}getMessage`, { userId, messageId })
    .then(({ data }) => data)

export const editMessage = (messageId, newValue, editionTimeStamp) => axios.post(`${url}editMessage`, { messageId, newValue, editionTimeStamp })
    .then(({ editedMessageId }) => editedMessageId)

export const deleteMessage = (messageId, wasDeletedGlobally) => axios.post(`${url}deleteMessage`, { messageId, wasDeletedGlobally })