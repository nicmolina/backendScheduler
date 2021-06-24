const mongoose = require('../database');

const HoursSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
        unique: true
    },
    day: {
        type: Date,
        require: true,
    },
    hours: {
        type: Number,
        require: true
    },
    arriveTime: {
        type: Date,
        require: true
    },
    exitTime: {
        type: Date,
        require: true
    },
    lunchBreak: {
        type: Date,
        require: true
    }
})

const Hours = mongoose.model('Hours', HoursSchema);

module.exports = Hours;