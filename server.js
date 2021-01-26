//importing stuff
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import bodyParser from 'body-parser'
import path from 'path'
import Pusher from 'pusher'
import mongoPosts from './mongoPosts.js'

Grid.mongo = mongoose.mongo


//app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1143650",
    key: "07f4d6b841e7ccf6aa69",
    secret: "46e2fb4a688fa7de5f10",
    cluster: "us2",
    useTLS: true
  });
  
//middlewares
app.use(bodyParser.json());
app.use(cors())

// connect db
const mongoURI= "mongodb+srv://shreyansh712:iamgod007@cluster0.kncce.mongodb.net/fb-db?retryWrites=true&w=majority"

const conn = mongoose.createConnection(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('DB Connected')

    const changeStream = mongoose.connection.collection('posts').watch()
    changeStream.on('change', (change) =>{
        console.log(change)

        if(change.operationType === 'insert') {
            console.log('Triggering Pusher')

            pusher.trigger('posts', 'inserted', {
                change : change
            })
        }else {
            console.log('Error triggering Pusher')
        }
    })
})

let gfs


conn.once('open',()=>{
    console.log('DB Connected')

    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('images')
})

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise ((resolve, reject)=> {{
            const filename = `image-${Date.now()}${path.extname(file.originalname)}`

            const fileInfo = {
                filename: filename,
                bucketName: 'images'
            }
            resolve(fileInfo)
        }})
    }
})

const upload = multer({ storage })


//api routes
app.get('/', (req,res)=>{
    res.status(200).send('Hello World')
})

app.post('/upload/image', upload.single('file'),(req,res)=>{
    res.status(201).send(req.file)
})

app.post('/upload/post', (req, res)=>{
    const dbPost = req.body
    console.log(dbPost)

    mongoPosts.create(dbPost, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/retrieve/image/single', (req, res) => {
    gfs.files.findOne({ filename: req.query.name }, (err, file) =>{
        if(err) {
            res.status(500).send(err)
        } else {
            if (!file || file.length === 0) {
                res.status(404).json({err: 'file not found '})
            } else {
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
            }
        
        }
    })
})

app.get('/retrieve/posts', (req,res) =>{
    mongoPosts.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            data.sort((b,a)=> {
                return a.timestamp - b.timestamp;
            });

            res.status(200).send(data)
        }
    })
})

//listen
app.listen(port, () => console.log(`listening on localhost:${port}`))