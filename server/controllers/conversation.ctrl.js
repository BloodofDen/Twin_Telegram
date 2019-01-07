const User = require('./../models/User')
const Message = require('./../models/Message')
const Conversation = require('./../models/Conversation')
const UserToConversation = require('./../models/UserToConversation')

const ObjectId = require('mongoose').Types.ObjectId

const getConversations = async (req, res, next) => {
    const userId = req.params.id

    try {
        const userToConversationsOfUser = await UserToConversation.find({ userId: ObjectId(userId) })

        if(!userToConversationsOfUser || !userToConversationsOfUser.length) {
            res.send([])
            next()

            return
        }
        
        const conversations = await Conversation.find({
            _id: {
                $in: userToConversationsOfUser.map(r => r.conversationId)
            }
        }) || []
        
        const userToConversationsOfConversations = await UserToConversation.find({
            userId: {
                $ne: ObjectId(userId)
            },
            conversationId: {
                $in: conversations.filter(c => c.isPrivate).map(c => c._id)
            }
        }) || []

        const users = await User.find({
            _id: {
                $in: userToConversationsOfConversations.map(r => r.userId)
            }
        })

        conversations.forEach(({ _doc }) => {
            const uTCoU = userToConversationsOfUser.find(uTC => uTC.conversationId.toString() === _doc._id.toString() && uTC.userId.toString() === userId)
            _doc.unreadMessagesCount = uTCoU.unreadMessagesCount
            
            if(!_doc.isPrivate) return
            
            const uTCoC = userToConversationsOfConversations.find(r => r.conversationId.toString() === _doc._id.toString())
            const user = users.find(u => u._id.toString() === uTCoC.userId.toString())

            _doc.title = user.name
            _doc.image = user.image
            _doc.color = user.color
        })
        
        res.send(conversations)
    } catch(e) {
        res.send(e)
    }

    next()
}

const getConversation = async (req, res, next) => {
    const { userId, conversationId } = req.params

    UserToConversation.updateOne({
        userId: ObjectId(userId),
        conversationId: ObjectId(conversationId)
    }, {
        $set: { unreadMessagesCount: 0 }
    }, (err, updatedRecords) => err && console.log('err-->', err))

    try {
        const conversation = { ...(await Conversation.findById(conversationId))._doc }        
        conversation.messages = await Message.find({
            conversationId: ObjectId(conversationId),
            wasDeletedGlobally: { $ne: true },
            $or: [
                { fromUserId: { $ne: ObjectId(userId) } },
                {
                    $and: [
                        { fromUserId: ObjectId(userId) },
                        { wasDeletedLocally: { $ne: true } }
                    ]
                }
            ]
        })
        
        const userToConversationsOfConversations = await UserToConversation.find({
            userId: {
                $ne: ObjectId(userId)
            },
            conversationId: ObjectId(conversationId)
        })
        
        conversation.companions = await User.find({
            _id: {
                $in: userToConversationsOfConversations.map(r => r.userId)
            }
        }) || []

        if(conversation.isPrivate && conversation.companions.length) {
            const [ companion ] = conversation.companions

            conversation.title = companion.name
            conversation.image = companion.image
            conversation.color = companion.color
        }

        res.send(conversation)
    } catch (e) {
        res.send(e)
    }

    next()
}

const createConversation = async (req, res, next) => {
    const userId = req.params.id
    const { conversationData, companionsIds } = req.body

    try {
        const conversation = { ...(await Conversation.create({
            ...(conversationData || {}),
            isPrivate: companionsIds.length === 1
        }))._doc}
    
        const usersToConversation = companionsIds.map(c => ({
            userId: ObjectId(c),
            conversationId: ObjectId(conversation._id)
        }))
    
        usersToConversation.push({
            userId: ObjectId(userId),
            conversationId: ObjectId(conversation._id)
        })
    
        UserToConversation.collection.insertMany(usersToConversation)
        
        conversation.companions = await User.find({ _id: { $in: companionsIds }}) || []

        if(!conversation.isPrivate) {
            res.send(conversation)
        } else {
            const [ companion ] = conversation.companions

            conversation.title = companion.name
            conversation.image = companion.image
            conversation.color = companion.color

            res.send(conversation)
        }
    } catch (e) {
        res.send(e)
    }

    next()
}

const addUser = (req, res, next) => {
    new User(req.body).save((err, newUser) => {
        if (err)
            res.send(err)
        else if (!newUser)
            res.send(400)
        else
            res.send(newUser)
        next()
    })
}

const addUserToConversation = (req, res, next) => {
    UserToConversation.insert(req.body)
        .then((err, record) => {
            if (err)
                res.send(err)
            else if (!record)
                res.send(404)
            else
                res.send(record._id)
            next()
        })
}

const removeUserFromConversation = (req, res, next) => {
    UserToConversation.findOneAndDelete(req.body)
        .then((err, record) => {
            if (err)
                res.send(err)
            else if (!record)
                res.send(404)
            else
                res.send(record._id)
            next()
        })    
}

const addMessage = (req, res, next) => {
    const { conversationId, fromUserId } = req.body

    console.log('fromUserId::', fromUserId)
    console.log('conversationId::', conversationId)

    UserToConversation.updateMany({
        userId: {
            $ne: ObjectId(fromUserId)
        },
        conversationId: ObjectId(conversationId)
    }, {
        $inc: { unreadMessagesCount: 1 }
    }, (err, updatedRows) => {
        if(err) {
            console.error('err-->', err)
            res.send(err)
            next()

            return
        }

        new Message(req.body).save((err, message) => {
            if (err)
                res.send(err)
            else if (!message)
                res.status(400)
            else
                res.send(message._id)
            next()
        })
    })
}

const getMessage = (req, res, next) => {
    const { userId, messageId } = req.body

    Message.findById(messageId)
        .then((err, message) => {
            if(err) {
                console.error('err-->', err)
                res.send(err)
                next()

                return
            }

            UserToConversation.updateOne({
                userId: ObjectId(userId),
                conversationId: ObjectId(message.conversationId)
            }, {
                $inc: { unreadMessagesCount: -1 }
            }, (err, updatedRows) => {
                res.send(message)

                next()
            })
        })
}

const editMessage = (req, res, next) => {
    const { messageId, newValue, editionTimeStamp } = req.body

    Message.findByIdAndUpdate(
        messageId,
        {
            $set: {
                text: newValue,
                editionTimeStamp,
                wasEdited: true
            }
        },
        (err, updatedRecord) => {
            res.send(updatedRecord._id)

            next()
        }
    )
}

const deleteMessage = (req, res, next) => {
    const { messageId, wasDeletedGlobally } = req.body

    Message.findByIdAndUpdate(
        messageId,
        {
            $set: {
                wasDeletedLocally: true,
                wasDeletedGlobally
            }
        },
        (err, updatedRecord) => {
            res.send(updatedRecord._id)

            next()
        }
    )
}

module.exports = {
    getConversations,
    getConversation,
    createConversation,
    addUserToConversation,
    removeUserFromConversation,
    addMessage,
    getMessage,
    editMessage,
    deleteMessage
}