const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const routes = require('./routes/')
const Pusher = require('pusher')

const Message = require('./models/Message')

const app = express()
const router = express.Router()

routes(router)

app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router)

const uri = process.env.MONGODB_URI || 'mongodb+srv://Admin:zyyphXlPcEjTWoBo@sp-labwork-ty5ka.mongodb.net/TestDB'
const port = 5000 || process.env.PORT

mongoose.connect(uri, {
    autoReconnect: true,
    useNewUrlParser: true
}).then(() => {
    console.log('DB Connection established!')

    const pusher = new Pusher({
        appId: '685226',
        key: '64ff9c2816e5fc2acb6d',
        secret: 'e60c990411793025994a',
        cluster: 'eu',
        useTLS: true
    })

    Message.watch().on('change', changedData => {
        const { operationType, fullDocument, ns: { coll }, documentKey, updateDescription } = changedData
        console.log('***************')
        console.log('Operation Type::: ', operationType)
        console.log('Collection::: ', coll)
        console.log('Full Document::: ', fullDocument)
        console.log('Document Key::: ', documentKey)
        console.log('***************')
        console.log('changedData', changedData)

        operationType === 'insert' && pusher.trigger(coll, operationType, {
            _id: fullDocument._id,
            conversationId: fullDocument.conversationId
        })
        operationType === 'update' && pusher.trigger(coll, operationType, {
            updatedMessageId: documentKey._id,
            updatedFields: updateDescription.updatedFields
        })
        // operationType === 'delete' && pusher.trigger(coll, operationType, documentKey._id)    
    })
    
    app.listen(port, () => console.log(`Server started at port: ${port}...`))
}).catch(err => console.error('err:::->>', err))