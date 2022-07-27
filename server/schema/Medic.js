const mongoose = require('mongoose')
const Schedule = require('./Schedule')
const Specialty = require('./Specialty') 
const Appointment = require('./Appointment')

const MedicSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    specialty: Specialty.SpecialtySchema,
    appointments: [Appointment.AppointmentSchema]
    // schedule: Schedule.ScheduleSchema,
})

const Medic = mongoose.model("Medic", MedicSchema)

module.exports = { Medic, MedicSchema }