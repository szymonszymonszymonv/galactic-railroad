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

router.post("/admin", async (req, res) => {
    console.log(`POST /admin`)
    try {
        const admin = new Admin({ email: req.body.email, password: req.body.password })
        await admin.save(
            res.send(admin)
        )
    }
    catch(e) {
        res.status(400).send(e.message)
    }
})

module.exports = router