"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    AMADEUS_API_KEY: process.env.AMADEUS_API_KEY,
    AMADEUS_API_SECRET: process.env.AMADEUS_API_SECRET,
    PORT: process.env.PORT || 3000
};
