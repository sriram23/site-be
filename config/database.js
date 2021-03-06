const dotenv = require("dotenv")
dotenv.config()

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('Failed connecting Mongodb:', err));
const conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;