const express = require('express')
const exphbs = require('express-handlebars')
// const logger = require('morgan')


const PORT = process.env.PORT || 3000
const app = express()


// app.use(logger('dev'))


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))


app.engine(
    'hbs',
    exphbs({
        defaultLayout: 'main'
    })
)
app.set('view engine', 'hbs')


require('./app/routes/htmlRoutes')(app)
require('./app/routes/apiRoutes')(app)


app.listen(PORT, function () {
    console.log(`App running on port ${PORT}!`)
})


module.exports = app