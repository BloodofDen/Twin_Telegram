const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const routes = require('./routes/')
const Message = require('./models/Message')

const app = express()
const router = express.Router()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

routes(router)

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router)

const uri = process.env.MONGODB_URI || 'mongodb+srv://Admin:zyyphXlPcEjTWoBo@sp-labwork-ty5ka.mongodb.net/TestDB'
const { PORT = 5000 } = process.env

mongoose.connect(uri, {
    autoReconnect: true,
    useNewUrlParser: true
}).then(() => {
    console.log('DB Connection established!')

    io.on('connection', socket => {
        console.log('A new User has connected')
        
        socket.on('subscribeToConversations', conversationsIds => {
            console.log('Joining conversations::', conversationsIds)
            conversationsIds.forEach(conversationId => socket.join(conversationId))
        })

        socket.on('subscribeToConversation', conversationId => {
            console.log('Joining conversation::', conversationId)
            socket.join(conversationId)
        })

        socket.on('typingMessage', typingMessageConfig => {
            socket.to(typingMessageConfig.conversationId).emit('typingMessage', typingMessageConfig)
        })

        socket.on('disconnect', () => console.log('User disconnected...'))
    })

    Message.watch().on('change', ({ operationType, fullDocument, ns: { coll }, documentKey, updateDescription }) => {
        console.log('***************')
        console.log('Operation Type::: ', operationType)
        console.log('Collection::: ', coll)
        console.log('Full Document::: ', fullDocument)
        console.log('Document Key::: ', documentKey)
        console.log('***************')

        operationType === 'insert' && io.to(fullDocument.conversationId).emit('newMessage', fullDocument)
        operationType === 'update' && Message.findById(documentKey._id)
            .then(({ conversationId }, err) => {
                if(err) {
                    console.error('err-->', err)

                    return
                }

                io.to(conversationId).emit('editMessage', {
                    messageId: documentKey._id,
                    updatedFields: updateDescription.updatedFields
                })  
            })

        // operationType === 'delete' && pusher.trigger(coll, operationType, documentKey._id)    
    })
    
    server.listen(PORT, () => console.log(`Server started at port: ${PORT}...`))
}).catch(err => console.error('err:::->>', err))