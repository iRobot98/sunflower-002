const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { Schema, model } = mongoose;

const User = model('User', new Schema({
    full_name: {
        first_name: { type: String, required: true },
        middle_name: { type: String },
        second_name: { type: String, required: true },
    },
    user_name: { type: String, required: true },
    password: { type: String, select: false, },
    phone_number: {
        type: [{
            type: stringify,
            required: true,
        }]
    },
    id_number: {
        type: stringify,
        required: true,
    },
    country: {
        type: stringify,
        required: true,
    }
}, {
    timestamps: true
}));



module.exports = User;