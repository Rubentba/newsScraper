// Dependencies
const mongoose = require('mongoose')
const axios = require('axios')
const cheerio = require('cheerio')


// Database setup
const db = require('../models')
// Connect to the Mongo DB
mongoose.connect('mongodb://localhost/nprScraper', { useNewUrlParser: true })


module.exports = function (app) {


    app.get('/api/articles', function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                res.json(dbArticle)
            })
            .catch(function (err) {
                res.json(err)
            })
    })


    app.get('/api/scrape', function (req, res) {


        axios.get('https://www.npr.org/sections/business/').then(function (response) {


            const $ = cheerio.load(response.data)


            $('article.item').each(function (i, element) {


                let result = {}


                result.title = $(this).find('h2.title').text()
                result.link = $(this).find('a').attr('href')
                result.image = $(this).find('img').attr('src')
                result.summary = $(this).find('p.teaser').text()


                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            })
        })
        res.send('Website scraped!')
    })


    app.get('/api/articles/:id', function (req, res) {


        db.Article.findOne({ _id: req.params.id })
            .populate('note')
            .then(function (dbArticle) {
                res.json(dbArticle)
            })
            .catch(function (err) {
                res.json(err)
            })
    })


    app.post('/api/articles/:id', function (req, res) {


        db.Note.create(req.body)
            .then(function (dbNote) {


                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
            })
            .then(function (dbArticle) {


                res.json(dbArticle)
            })
            .catch(function (err) {

                
                res.json(err)
            })
    })
}
