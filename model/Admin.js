const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Admin', adminSchema)