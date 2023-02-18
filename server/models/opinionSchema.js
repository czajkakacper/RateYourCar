const mongoose = require('mongoose')
const Joi = require("joi")

let opinionSchema = new mongoose.Schema({
    model: { type: String, required: true },
    marka: { type: String, required: true },
    rocznik: { type: Number, required: true },
    ocena: { type: Number, required: true },
})

let Opinion= mongoose.model('Opinion', opinionSchema)


const validate = (item) => {
    const schema = Joi.object({
        model: Joi.string().required().label("Model"),
        marka: Joi.string().required().label("Marka"),
        rocznik: Joi.number().required().label("Rocznik"),
        ocena: Joi.number().required().label("Ocena"),
    })
    return schema.validate(item)
}

module.exports = { Opinion, validate }
