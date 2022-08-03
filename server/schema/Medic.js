const mongoose = require('mongoose')
const Schedule = require('./Schedule')
const Specialty = require('./Specialty') 
const Appointment = require('./Appointment')

const MedicSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    // city: String,
    specialty: Specialty.SpecialtySchema,
    appointments: [Appointment.AppointmentSchema]
    // schedule: Schedule.ScheduleSchema,
})
MedicSchema.virtual('appointmentsSorted').get(function() {
    return [...this.appointments].sort((a, b) => {
        return (new Date(a.startDate) - new Date(b.startDate))
    })
})

const Medic = mongoose.model("Medic", MedicSchema)

module.exports = { Medic, MedicSchema }