const mongoose = require('mongoose')
// const Medic = require('./Medic')
const Patient = require('./Patient')

const AppointmentSchema = mongoose.Schema({
    startDate: Date,
    endDate: Date,
    patient: Patient.PatientSchema,
    // medic: Medic.MedicSchema
})
const Appointment = mongoose.model("Appointment", AppointmentSchema)

module.exports = { Appointment, AppointmentSchema }