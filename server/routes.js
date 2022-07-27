const express = require('express')
const router = express.Router()
const { Admin } = require('./schema/Admin')
const { Patient } = require('./schema/Patient')
const { Medic } = require('./schema/Medic')
const { Schedule } = require('./schema/Schedule')
const { Appointment } = require('./schema/Appointment')
const { Specialty } = require('./schema/Specialty')


router.get("/medics", async (req, res) => {
    console.log("GET /medics")
    const medics = await Medic.find()
    res.send(medics)
})

router.get("/specialties", async (req, res) => {
    console.log("GET /specialties")
    const specialties = await Specialty.find()
    res.send(specialties)
})

router.get("/appointments", async (req, res) => {
    console.log("GET /appointments")
    const appointments = await Appointment.find()
    res.send(appointments)
})

router.get("/appointments/available", async (req, res) => {
    // console.log(req.query)
    // TODO: to zrobic :D
    // FIXME: jestem niezrobiony :( 

    res.send(req.query)
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

router.post("/medics", async (req, res) => {
    console.log(`POST /medics`)
    try {
        const specialty = await Specialty.findOneAndUpdate(
            {name: req.body.specialty.name},
            {name: req.body.specialty.name},
            {new: true, upsert: true},
        )

        const medic = new Medic({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            specialty: specialty
        })
        await medic.save(
            res.send(medic)
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
            patient: patient,
            description: req.body.description
        })
        await appointment.save(
            res.send(appointment)
        )
    }
    catch(e) {
        res.status(400).send(e.message)
    }
})

router.delete("/appointments/:id", async (req, res) => {
    console.log(`DELETE /appointments`)
    let appointment = await Appointment.findOne({_id: req.params.id})
    try {
        await Appointment.deleteOne({_id: appointment._id})
        res.status(200).send(appointment)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.put("/appointments/", async (req, res) => {
    console.log(`PUT /appointments`)
    Appointment.findOneAndUpdate(
        {_id: req.body._id}, 
        req.body,
        { new: true },
        ((err, doc) => {
            if(err) return res.status(400).send(err.message)
            console.log(doc)
            return res.status(200).send(doc)
        }))
})

module.exports = router