const mongojs = require('mongojs')
const axios = require('axios')
const cheerio = require('cheerio')


// Database configuration
const databaseUrl = 'scraper'
const collections = ['scrapedData']


// Hook mongojs configuration to the db constiable
const db = mongojs(databaseUrl, collections)
db.on('error', function (error) {
    console.log(`Database Error: ${error}`)
})


app.get('/all', function (req, res) {
    db.scrapedData.find({}, function (err, found) {
        if (err) {
            console.log(err)
        }
        else {
            res.json(found)
        }
    })
})


app.get('/scrape', function (req, res) {

    axios.get('https://www.npr.org/sections/business/').then(function (response) {

        const $ = cheerio.load(response.data)

        $('article.item').each(function (i, element) {

            const title = $(element).find('h2.title').text()
            const link = $(element).find('a').attr('href')
            const image = $(element).find('img').attr('src')
            const summary = $(element).find('p.teaser').text()

            if (title && link && image && summary) {
                db.scrapedData.insert({
                    title: title,
                    link: link,
                    image: image,
                    summary: summary
                }, function (err, inserted) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(inserted)
                    }

                })
            }
        })
    })
    res.send('Scraped')
})
