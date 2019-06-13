const express = require("express");
const multer = require("multer");
const Router = new express.Router();

const Prescrition = require("../src/Models/Patient");

Router.get("/prescriptions/:email", (req, res) => {
    const email = req.params.email;
    console.log(email);

    Prescrition.findOne({ email })
        .then(value => {
            if (!value) return res.status(404).send();

            res.send(value.prescriptions).status(200);
        })
        .catch(err => {
            res.status(500).send(err);
        });
      });

Router.post("/prescriptions/:email", (req, res) => {
    const email = req.params.email;

    Prescrition.findOneAndUpdate(
        { email },
        { $push: { prescriptions: req.body } },
        { new: true }
    )
        .then(val => {
            res.send(val).status(200);
        })
        .catch(err => {
            res.send(err).status(500);
        });
});

const upload = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(pdf)$/)) {
            return cb(new Error("Please upload a  pdf file"));
        }
        cb(undefined, true);
    }
});

Router.post(
    "/prescription/image/:email",
    upload.single("pres_image"),
    (req, res) => {
        const email = req.params.email;
        temp = req.file.buffer;
        console.log(temp);
        /*
      Patient.updateOne({ email }, { avatar: temp })
      .then(val => {
          res.set("Content-Type", "image/jpg").send();
      })
      .catch(err => {
          res.send(err).status(404);
      });
*/
     res.send();
    }
);
module.exports = Router;
