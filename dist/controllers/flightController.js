"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeFlights = exports.getFlights = void 0;
const getFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ message: "Flights found!" });
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.getFlights = getFlights;
const analyzeFlights = (req, res) => {
    try {
        res.json({ message: "Flight analysis completed!" });
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};
exports.analyzeFlights = analyzeFlights;
