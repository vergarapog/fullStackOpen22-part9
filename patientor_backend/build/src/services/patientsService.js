"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientEntries_1 = __importDefault(require("../../data/patientEntries"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patientEntries_1.default;
};
const getPatientsNoSSN = () => {
    return patientEntries_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        };
    });
};
const addPatient = (entry) => {
    const id = (0, uuid_1.v)();
    const newPatient = Object.assign({ id }, entry);
    patientEntries_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getPatients,
    getPatientsNoSSN,
    addPatient,
};
