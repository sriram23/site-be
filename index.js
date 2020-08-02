const dotenv = require("dotenv")
const express = require('express')
const cors = require('cors')
const moment = require('moment')
const app = express();
const Blog = require('./models/blogModel')
dotenv.config()
app.use(cors({
    origin: ['http://localhost:8080','https://sriram23.github.io/site']
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

const database = require('./config/database')

app.listen(8000, () => console.log('App is listening port: 8000'));
app.get('/', (req, res) => {
    res.send('Hello World from Sriram!');
});

app.post('/create', (req, res) => {
    console.log('Request: ',req.body);
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

app.get('/fetch-blog', (req, res) => {
    Blog.find({},(err,data) => {
        if(err)
            console.error(err);
        else 
            res.json(data);
    });
});