// Require mongoose
const mongoose = require('mongoose')


// Get a reference to the mongoose Schema constructor
const Schema = mongoose.Schema


var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
})


// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model('Article', ArticleSchema)


// Export the Article model
module.exports = Article
