const userController = require('./../controllers/user.ctrl')

module.exports = (router) => {
    
    router
        .route('/user/logIn')
        .post(userController.getUser)
    
    router
        .route('/user/signUp')
        .post(userController.addUser)

    router
        .route('/user/:id')
        .get(userController.getUserInfo)
    
    // router
    //     .route('/user/:id/anotherUsers')
    //     .get(userController.getAnotherUsers)

    router
        .route('/user/:id/searchUsers')
        .post(userController.searchUsers)
    
}