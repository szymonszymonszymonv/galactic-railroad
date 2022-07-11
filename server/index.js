const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')

mongoose
.connect("mongodb://localhost:27017/galactic-railroad")
.then(() => {
        const app = express()
        app.use(cors())
        app.use(express.json())
        app.use('/', routes)
        app.listen(5000, () => {
            console.log("i am listening")
        })
    })