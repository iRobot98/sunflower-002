const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const User = model(
    "User",
    new Schema(
        {
            full_name: {
                first_name: { type: String, required: true },
                middle_name: { type: String },
                last_name: { type: String, required: true },
            },
            user_name: { type: String, required: false, unique: true },
            password: { type: String, required: true },
            date_of_birth: { type: String, required: true },
            phone_number: {
                type: [
                    {
                        type: String,
                        required: true,
                    },
                ],
            },
            email: {
                type: [String],
                required: false,
            },
            id_number: {
                type: String,
                required: false,
            },
            country: {
                type: String,
                default: "Kenya",
                required: false,
            },
        },
        {
            timestamps: true,
        }
    )
);

const RefreshToken = model(
    "RefreshToken",
    new Schema({
        owner: { type: Schema.Types.ObjectId, ref: "User" },
    })
);

module.exports = { RefreshToken, User };
