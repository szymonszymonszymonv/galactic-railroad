const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
    email: String,
    password: Boolean
})

const Admin = mongoose.model("Admin", AdminSchema)

module.exports = { Admin, AdminSchema }