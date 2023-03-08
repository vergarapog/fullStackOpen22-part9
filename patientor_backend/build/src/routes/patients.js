"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    return res.send(patientsService_1.default.getPatientsNoSSN());
});
router.post("/", (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { name, dateOfBirth, ssn, gender, occupation } = req.body;
        const newEntry = patientsService_1.default.addPatient({
            name,
            dateOfBirth,
            ssn,
            gender,
            occupation,
        });
        return res.send(newEntry);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send();
    }
});
exports.default = router;
