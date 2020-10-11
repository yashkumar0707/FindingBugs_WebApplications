const express = require('express')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const booksRoutes = require('./routes/books-routes')
const app = express()

app.use(bodyParser.json())
app.use('/api/books', booksRoutes)
app.listen(5000)

module.exports = app
