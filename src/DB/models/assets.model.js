const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Asset = model('Asset', new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String },
    image_id: { type: String },
    description: { type: String },
    price: { type: Number }
}, {
    timestamps: true,
}));

module.exports = {
    Asset
};