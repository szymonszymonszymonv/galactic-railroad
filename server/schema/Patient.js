const mongoose = require('mongoose')
// const Appointment = require('./Appointment')

const PatientSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    // appointments: [Appointment.AppointmentSchema]
})

Patient = mongoose.model("Patient", PatientSchema)

module.exports = { Patient, PatientSchema }