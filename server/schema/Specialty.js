const mongoose = require('mongoose')

const SpecialtySchema = mongoose.Schema({
    name: String 
})

const Specialty = mongoose.model("Specialty", SpecialtySchema)

module.exports = { Specialty, SpecialtySchema }