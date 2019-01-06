const User = require('./../models/User')
const UserToConversation = require('./../models/UserToConversation')

const addUser = (req, res, next) => {
    new User(req.body).save((newUser, err) => {
        if (err)
            res.send(err)
        else if (!newUser)
            res.send(400)
        else
            res.send(newUser)
        next()
    })
}

const getUser = (req, res, next) => {
    User.findOne(req.body, { password: 0 })
        .then((user, err) => {
            if (err)
                res.send(err)
            else if (!user)
                res.status(400)
            else
                res.send(user)
            next()
        })
}

const getUserInfo = (req, res, next) => {
    User.findById(req.params.id, { password: 0 })
        .then((user, err) => {
            if (err)
                res.send(err)
            else if (!user)
                res.status(404)
            else
                res.send(user)
            next()
        })
}

const searchUsers = async (req, res, next) => {
    const userId = req.params.id
    const { queryStr, conversationsIds } = req.body

    try {
        const usersAlreadyInConversationList = await UserToConversation.find({
            conversationId: {
                $in: conversationsIds
            }
        })

        console.log('usersAlreadyInConversationList', usersAlreadyInConversationList)
    
        const users = await User.find({
            name: {
                $regex: queryStr,
                $options: 'i'
            },
            _id: {
                $ne: userId,
                $nin: usersAlreadyInConversationList
                    .map(u => u.userId)
            }
        }, {
            password: 0 
        })

        console.log('users', users)

        res.send(users || 404)
    } catch(e) {
        res.send(e)
    }

    next()
}

// const getAnotherUsers = (req, res, next) => {
//     User.find({}, { password: 0 })
//         .where('_id')
//         .ne(req.params.id)
//         .then((users, err) => {
//             if (err)
//                 res.send(err)
//             else if (!users)
//                 res.send(404)
//             else
//                 res.send(users)
//             next()
//         })
// }

/**
 * user_to_follow_id, user_id
 */
// followUser: (req, res, next) => {
//     User.findById(req.body.id).then((user) => {
//         return user.follow(req.body.user_id).then(() => {
//             return res.json({msg: "followed"})
//         })
//     }).catch(next)
// },
// getUserProfile: (req, res, next) => {
//     User.findById(req.params.id).then
//     ((_user) => {
//         return User.find({'following': req.params.id}).then((_users)=>{
//             _users.forEach((user_)=>{
//                 _user.addFollower(user_)
//             })
//             return Article.find({'author': req.params.id}).then((_articles)=> {
//                 return res.json({ user: _user, articles: _articles })
//             })
//         })
//     }).catch((err)=>console.log(err))
// }

module.exports = {
    addUser,
    getUser,
    getUserInfo,
    // getAnotherUsers,
    searchUsers
}