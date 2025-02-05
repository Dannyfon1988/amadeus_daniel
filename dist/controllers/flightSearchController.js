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
exports.getFlights = getFlights;
const amadeusService_1 = require("../services/amadeusService");
function getFlights(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { origin, departureDate, duration, priceRange, nonStop } = req.query;
            if (!origin || !departureDate) {
                return res.status(400).json({ error: "Origin and departureDate are required." });
            }
            const flights = yield (0, amadeusService_1.searchFlights)(origin, departureDate, duration, priceRange, nonStop === "true");
            res.json({ flights });
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
