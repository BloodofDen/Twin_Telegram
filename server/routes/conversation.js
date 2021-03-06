const conversationController = require('../controllers/conversation.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

module.exports = (router) => {

    router
        .route('/user/:userId/conversation/:conversationId')
        .get(conversationController.getConversation)

    router
        .route('/user/:id/createConversation')
        .post(conversationController.createConversation)

    // router
    //     .route('/conversationInfo')
    //     .post(conversationController.getConversationInfo)

    router
        .route('/user/:id/conversations')
        .get(conversationController.getConversations)

    router
        .route('/addMessage')
        .post(conversationController.addMessage)

    router
        .route('/getMessage')
        .post(conversationController.getMessage)

    router
        .route('/editMessage')
        .post(conversationController.editMessage)

    router
        .route('/deleteMessage')
        .post(conversationController.deleteMessage)

    router
        .route('/readMessage')
        .post(conversationController.readMessage)

}