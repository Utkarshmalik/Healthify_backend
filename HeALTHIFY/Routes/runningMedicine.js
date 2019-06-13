const express = require("express");
const Router = new express.Router();
const Prescrition = require("../src/Models/Patient");

Router.get("/runMed/:email", (req, res) => {
    const email = req.params.email;
    console.log(email);

    Prescrition.findOne({ email })
        .then(value => {
            if (!value) return res.status(404).send();

            res.send(value.runningMedicines).status(200);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

Router.post("/runMed/:email", (req, res) => {
    const email = req.params.email;

    Prescrition.findOneAndUpdate(
        { email },
        { $push: { runningMedicines: req.body } },
        { new: true }
    )
        .then(val => {
            res.send(val).status(200);
        })
        .catch(err => {
            res.send(err).status(500);
        });
});

module.exports = Router;
