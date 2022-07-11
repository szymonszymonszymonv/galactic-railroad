const mongoose = require('mongoose')

const WorkingDaySchema = mongoose.Schema({
    dayOfTheWeek: Number,
    startTime: Date,
    endTime: Date    
})

const WorkingDay = mongoose.model("WorkingDay", WorkingDaySchema)

module.exports = { WorkingDay, WorkingDaySchema } 