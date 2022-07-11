const express = require('express')
const router = express.Router()
const { Admin } = require('./schema/Admin')
const { Patient } = require('./schema/Patient')
const { Medic } = require('./schema/Medic')
const { Schedule } = require('./schema/Schedule')


router.get("/medics", async (req, res) => {
    console.log("GET /medics")
    const medics = await Medic.find()
    res.send(medics)
})

module.exports = router