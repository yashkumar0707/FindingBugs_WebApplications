const express = require('express')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const booksRoutes = require('./routes/books-routes')
const app = express()

app.use(bodyParser.json())
app.use('/api/books', booksRoutes)
mongoose.connect('mongodb+srv://yash:yash1234@cluster0.jgkhw.mongodb.net/API_testing?retryWrites=true&w=majority').then(() => {
    app.listen(5000)
}).catch(err => {
    console.log(err)
})


module.exports = app
