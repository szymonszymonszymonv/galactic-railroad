const express = require('express')
const router = express.Router()
const { Admin } = require('./schema/Admin')
const { Patient } = require('./schema/Patient')
const { Medic } = require('./schema/Medic')
const { Schedule } = require('./schema/Schedule')
const { Appointment } = require('./schema/Appointment')


router.get("/medics", async (req, res) => {
    console.log("GET /medics")
    const medics = await Medic.find()
    res.send(medics)
})

router.get("/appointments", async (req, res) => {
    console.log("GET /appointments")
    const appointments = await Appointment.find()
    res.send(appointments)
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

router.post("/appointments", async (req, res) => {
    console.log(`POST /appointments`)
    console.log(req.body)
    let patient = null
    try{
        patient = new Patient({ ...req.body.patient })
        await patient.save()    
        const appointment = new Appointment({ 
            startDate: req.body.startDate, 
            endDate: req.body.endDate, 
            patient: patient
        })
        await appointment.save(
            res.send(appointment)
        )
    }
    catch(e) {
        res.status(400).send(e.message)
    }
})

module.exports = router