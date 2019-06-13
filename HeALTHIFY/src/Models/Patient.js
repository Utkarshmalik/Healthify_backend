const mongoose = require("mongoose");
const App = require("../db/mongoose");
const validator = require("validator");

var Schema = mongoose.Schema;

const FoodMeal = new Schema({
    image: {
        type: Buffer
    },

    calories: {
        type: Number
    },
    proteins: {
        type: Number
    },
    carbohydrates: {
        type: Number
    },
    vitamins: {
        type: Number
    }
});

const Report = new Schema({
    date: {
        type: Date
        //required: true
    },
    testType: {
        type: String
        //required: true
    },
    pdf: {
        type: Buffer
    }
});

const Medicine = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: Buffer
    },
    freq: {
        type: Number,
        required: true
    },
    dur: {
        type: Number,
        required: true
    }
});

const Prescription = new Schema({
    date: {
        type: Date,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    doctorId: {
        type: String
        //required: true
    },
    imagePres: {
        type: Buffer
        //required: true
    },
    diseaseType: {
        type: String
        //required: true
    },
    hospitalName: {
        type: String,
        required: true
    },

    medicine: [Medicine],
    comments: {
        type: String
    }
});

const Patient = mongoose.model("Patient", {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Id");
            }
        }
    },
    phone: {
        type: String,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error("Invalid Phone Number");
            }
        }
    },

    address: {
        type: String
    },

    emergencyPhone: {
        type: String,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error("Invalid Phone Number");
            }
        }
    },

    height: {
        type: Number
    },

    weight: {
        type: Number
    },

    bloodGroup: {
        type: String,

        validate(value) {
            const bloodGroups = [
                "A+",
                "A-",
                "B+",
                "B-",
                "O+",
                "O-",
                "AB+",
                "AB-"
            ];

            if (!bloodGroups.includes(value)) {
                throw new Error("Invalid Blood Group");
            }
        }
    },
    avatar: {
        type: Buffer,
        default: undefined
    },
    prescriptions: [Prescription],
    reports: [Report],
    runningMedicines: ["medicine"],
    FoodDetails: {
        breakfast: {
            type: FoodMeal,
            default: null
        },
        lunch: {
            type: FoodMeal,
            default: null
        },

        snacks: {
            type: FoodMeal,
            default: null
        },
        dinner: {
            type: FoodMeal,
            default: null
        }
    }
});

/*
const patient1 = new Patient({
    name: "Utkarsh",
    age: 20,
    dob: new Date("07.08.2019"),
    email: "utkarshmalik06@gmail.com",
    phone: "7409747373",
    emergencyPhone: "9897174773",
    address: "Oyo Flagship",
    bloodGroup: "O+"
});

patient1
    .save()
    .then(chill => {
        console.log(chill);
    })
    .catch(err => console.log("Error"));
*/

module.exports = Patient;
