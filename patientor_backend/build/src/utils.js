"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUUID = void 0;
const parseUUID = (uuid) => {
    if (!uuid || !isString(uuid)) {
        throw new Error("Incorrect or wrong uuid: " + uuid);
    }
    return uuid;
};
exports.parseUUID = parseUUID;
const isString = (text) => {
    return typeof text === "string";
};
