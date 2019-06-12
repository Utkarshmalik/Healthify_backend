const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const Patient = require("./src/Models/Patient");

require("./src/db/mongoose");
app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use(express.json());

app.post("/patient", (req, res) => {
    console.log(req.body);
    const newPatient = new Patient(req.body);

    newPatient
        .save()
        .then(val => {
            res.send(val).status(201);
        })
        .catch(err => {
            console.log(console.err);
            res.send(err).status(500);
        });
});

app.get("/patient/:email", (req, res) => {
    const email = req.params.email;

    Patient.findOne({ email })
        .then(patient => {
            console.log(patient);
            if (patient === null) {
                console.log("rfr");
                return res.status(404).send();
            }

            res.send(patient).status(200);
        })
        .catch(err => res.send(err).status(500));
});

app.listen(port, () => {
    console.log(`server is running on port no ${port}`);
});
