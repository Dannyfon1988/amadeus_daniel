import dotenv from "dotenv";
const Amadeus = require("amadeus");

dotenv.config();

if (!process.env.AMADEUS_API_KEY || !process.env.AMADEUS_API_SECRET) {
  throw new Error("Missing Amadeus API credentials in environment variables.");
}

console.log("API KEY:", process.env.AMADEUS_API_KEY);
console.log("API SECRET:", process.env.AMADEUS_API_SECRET);


// Configurar el cliente de Amadeus
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY!,
  clientSecret: process.env.AMADEUS_API_SECRET!,
});

export async function searchFlights(
  origin: string,
  destination: string,
  departureDate: string,
  duration?: string,
  maxPrice?: string,
  nonStop?: boolean
) {
  try {
    // Construir los parámetros dinámicamente
    const params: any = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults: 1,
    };

    if (maxPrice) params.maxPrice = maxPrice;
    if (nonStop !== undefined) params.nonStop = nonStop ? "true" : "false";

    console.log("Requesting flights with params:", params);

    const response = await amadeus.shopping.flightOffersSearch.get(params);

    if (!response.data) {
      throw new Error("Amadeus API returned an empty response");
    }

    return response.data;

  } catch (error: any) {
    console.error("Error fetching flights:", error);

    if (error.response) {
      console.error("Full API error response:", JSON.stringify(error.response.data, null, 2)); //DEBUG
    }

    throw new Error(`Amadeus API error: ${error.response?.data?.errors?.[0]?.detail || error.message || "Unknown error"}`);
  }
}
