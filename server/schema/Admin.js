const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
    email: String,
    password: Boolean
})

const Admin = mongoose.model("Admin", TodoSchema)

module.exports = { Admin, AdminSchema }