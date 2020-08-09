const dotenv = require("dotenv")
const express = require('express')
const cors = require('cors')
const moment = require('moment')
const app = express();
const Blog = require('./models/blogModel')
dotenv.config()

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

const database = require('./config/database')

app.listen(process.env.PORT || 8000, () => console.log('App is listening port: 8000'));
app.get('/', (req, res) => {
    res.send('Hello World from Sriram!');
});

app.post('/create', (req, res) => {
    const request = req.body;
    request.createdAt = moment();
    request.updatedAt = moment();
    const newBlog = new Blog(request);
    newBlog.save((err, data) => {
        if(err) {
            console.error(err);
            res.send('Some thing went wrong while pushing data', err).status(404);
        } else {
            res.send('Blog created successfully').status(200);
        }
    });
});

app.get('/fetch-all', async (req, res) => {
    await Blog.find({}, (err, data) => {
        if(err) console.error(err);
        else res.json(data);
    });
})

app.get('/fetch-blog/:skip/:limit', async (req, res) => {
    const skip = Number(req.params.skip*req.params.limit);
    const limit = Number(req.params.limit);
    await Blog.find({}).sort({createdAt: -1})
    .skip(skip)
    .limit(limit)
    .exec((err,data) => {
        if(err)
            console.error(err);
        else 
            res.json(data);
    });
});

app.get('/blog/:blogId', async (req, res) => {
    await Blog.find({_id: req.params.blogId}, (err, data) => {
        if(err)
            console.error(err);
        else
            res.json(data);
    })
})

app.post('/update', async (req, res) => {
    newData = {
        _id: req.body._id,
        title: req.body.title,
        content: req.body.content,
        updatedAt: moment(),
    }
    query = {_id: req.body._id}
    await Blog.findOneAndUpdate(query, newData, (err, data) => {
        if(err) console.error(err);
        else{
            res.send(data);
        }
    })
})