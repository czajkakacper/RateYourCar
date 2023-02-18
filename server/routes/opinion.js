const express = require('express')
const router = express.Router()
const { Opinion, validate } = require("../models/opinionSchema.js")


// Dodawanie
router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body)

        if (error)
            return res.status(400).send({ message: error.details[0].message })

        const opinion = await Opinion.findOne({ _id: req.body._id })

        if (opinion)
            return res
                .status(409)
                .send({ message: "Opinion with given email already Exist!" })

        await new Opinion({ ...req.body}).save()
        res.status(201).send({ message: "Opinion created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

// Wyswietlenie
router.get("/list", async (req, res) => {
    try{
        const opinion = await Opinion.find();
        res.status(201).json(opinion)
        console.log(opinion);
    } catch(error){
        res.status(422).json(error)
    }
})

router.get('/list/:id', async (req, res) => {
    try {
        const opinion = await Opinion.findById(req.params.id);
        res.json(opinion);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

// Usuwanie
router.delete('/delete/:id', async(req, res) => {
    Opinion.findByIdAndRemove(req.params.id, (err, item) =>{
        if(!err){
            console.log("Opinia została usunięta: ", item)
            res.json(item)
        }
        else{
            res.status(400).json(err)
        }
    })
})

router.put('/update/:id', async (req, res) => {
    try {
        const updateduser = await Opinion.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router