// Dependencies
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const logger = require('morgan')
const path = require('path')


// For Heroku
const PORT = process.env.PORT || 3000
const app = express()


// For Morgan
app.use(logger('dev'))


// For Express
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('app/public'))


// For Handlebars
app.engine('hbs', exphbs({
    defaultLayout: "main",
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set("views", path.join(__dirname, "app/views"))


// Routes
require('./app/routes/htmlRoutes')(app)
require('./app/routes/apiRoutes')(app)


// DB URL
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines'


// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })


// Making sure the server is live.
app.listen(PORT, function () {
    console.log(`App running on port ${PORT}!`)
})


module.exports = app