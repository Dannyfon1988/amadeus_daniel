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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFlights = searchFlights;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AMADEUS_BASE_URL = "https://test.api.amadeus.com/v1";
let accessToken = null;
function authenticate() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.post(`${AMADEUS_BASE_URL}/security/oauth2/token`, new URLSearchParams({
            grant_type: "client_credentials",
            client_id: process.env.AMADEUS_API_KEY,
            client_secret: process.env.AMADEUS_API_SECRET
        }), { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
        accessToken = response.data.access_token;
        return accessToken;
    });
}
function searchFlights(origin, departureDate, duration, priceRange, nonStop) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!accessToken)
            yield authenticate();
        const response = yield axios_1.default.get(`${AMADEUS_BASE_URL}/shopping/flight-offers`, {
            params: {
                originLocationCode: origin,
                departureDate,
                maxPrice: priceRange,
                nonStop: nonStop ? "true" : "false"
            },
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data;
    });
}
