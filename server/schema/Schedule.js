const mongoose = require('mongoose')
const Appointment = require('./Appointment')
const WorkingDay = require('./WorkingDay')
const Medic = require('./Medic')

const ScheduleSchema = mongoose.Schema({
    acceptingAppointments: [WorkingDay.WorkingDaySchema],
    appointments: [Appointment.AppointmentSchema],
    medicOwner: Medic.MedicSchema    
})

const Schedule = mongoose.model("Schedule", ScheduleSchema)

module.exports = { Schedule, ScheduleSchema }