// Require mongoose
const mongoose = require('mongoose')


// Get a reference to the mongoose Schema constructor
const Schema = mongoose.Schema


const NoteSchema = new Schema({
    title: String,
    body: String
})


// This creates our model from the above schema, using mongoose's model method
const Note = mongoose.model('Note', NoteSchema)


// Export the Article model
module.exports = Note