const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { Schema, model } = mongoose;

const RequestLog = model('RequestLog', new Schema(
    {
        time: { type: String, required: true },
        url_string: { type: String, required: true },
        headers: { type: Schema.Types.Mixed, required: true },
        httpVersion: { type: String, required: true },
    }, {
    timestamps: true
}
));
const GeneralLog = model("GeneralLog", new Schema({
    time: { type: Number, required: true },
    log_entry: { type: String, required: true },
}))



module.exports = { RequestLog, GeneralLog };