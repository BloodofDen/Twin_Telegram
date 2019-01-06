const user = require('./user')
const conversation = require('./conversation')

module.exports = (router) => {
    user(router)
    conversation(router)
}