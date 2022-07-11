const mongoose = require('mongoose')
const Schedule = require('./Schedule')
const Specialty = require('./Specialty') 
// const Appointment = require('./Appointment')

const MedicSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    specialty: Specialty.SpecialtySchema,
    schedule: Schedule.ScheduleSchema,
    // appointments: [Appointment.AppointmentSchema]
})

const Medic = mongoose.model("Medic", MedicSchema)

module.exports = { Medic, MedicSchema }