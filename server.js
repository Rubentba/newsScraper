// Dependencies
const express = require('express')
const exphbs = require('express-handlebars')
const logger = require('morgan')
const path = require('path')
const mongoose = require('mongoose')


// For Heroku
const PORT = process.env.PORT || 3000
const app = express()


// For mongoHeadlines
const MONGODB_URI = process.env.MONGOD_URI || "mongod://localhost/mongoHeadlines"


// Connect to the Mongo DB
mongoose.connect(MONGODB_URI)


// For Morgan
app.use(logger('dev'))


// For Express
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))


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


// Making sure the server is live.
app.listen(PORT, function () {
    console.log(`App running on port ${PORT}!`)
})


module.exports = app