const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const RefreshToken = model('RefreshToken', new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
}));

module.exports = RefreshToken;