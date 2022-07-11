const mongoose = require('mongoose')
const Appointment = require('./Appointment')
const WorkingDay = require('./WorkingDay')

const ScheduleSchema = mongoose.Schema({
    acceptingAppointments: [WorkingDay.WorkingDaySchema],
    appointments: [Appointment.AppointmentSchema]    
})

const Schedule = mongoose.model("Schedule", ScheduleSchema)

module.exports = { Schedule, ScheduleSchema }