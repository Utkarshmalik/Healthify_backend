const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const multer = require("multer");
const Patient = require("./src/Models/Patient");
const Prescription = require("./Routes/prescription");
const runningMedicine = require("./Routes/runningMedicine");
const FoodDetails = require("./Routes/foodIntake");
const Reports = require("./Routes/Reports");

require("./src/db/mongoose");
app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use(express.json());

app.use(Prescription);
app.use(runningMedicine);
app.use(FoodDetails);
app.use(Reports);

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

const upload = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload a  image"));
        }
        cb(undefined, true);
    }
});

app.post("/profile/:email", upload.single("avatar"), (req, res) => {
    const email = req.params.email;
    temp = req.file.buffer;

    Patient.updateOne({ email }, { avatar: temp })
        .then(val => {
            res.set("Content-Type", "image/jpg").send();
        })
        .catch(err => {
            res.send(err).status(404);
        });

    res.send();
});

app.listen(port, () => {
    console.log(`server is running on port no ${port}`);
});
