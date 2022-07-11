const mongoose = require('mongoose')
const WorkingDay = require('./WorkingDay')

const WorkingScheduleSchema = mongoose.Schema({
    acceptingAppointments: [WorkingDay.WorkingDaySchema]
})

const WorkingSchedule = mongoose.model("WorkingSchedule", WorkingScheduleSchema)

module.exports = { WorkingSchedule, WorkingScheduleSchema }