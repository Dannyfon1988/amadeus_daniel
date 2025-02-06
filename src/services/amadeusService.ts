import dotenv from "dotenv"; // paquete que carga variables de entorno desde un archivo .env


const Amadeus = require("amadeus"); //  librería que permite interactuar con la API de Amadeus para buscar vuelos y obtener información de viajes.

dotenv.config(); // Carga las variables de entorno

// verificacion de credenciales de la API
if (!process.env.AMADEUS_API_KEY || !process.env.AMADEUS_API_SECRET) {
  throw new Error("Missing Amadeus API credentials in environment variables.");
}

console.log("API KEY:", process.env.AMADEUS_API_KEY);
console.log("API SECRET:", process.env.AMADEUS_API_SECRET);


// Configurar el cliente de Amadeus
const amadeus = new Amadeus({


// El ! al final indica que estamos seguros de que no será undefined
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
    const params: any = { // Se construye un objeto params con los parámetros mínimos requeridos por la API.
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults: 1,
    };

    // solo se agregan si estan definidos 
    if (maxPrice) params.maxPrice = maxPrice;
    if (nonStop !== undefined) params.nonStop = nonStop ? "true" : "false"; // se convierte en un string porque la API espera "true" o "false"

    console.log("Requesting flights with params:", params);

    // Hace la Petición a la API de Amadeus
    // await espera la respuesta antes de continuar 
    const response = await amadeus.shopping.flightOffersSearch.get(params);
    // Validar la Respuesta de la API
    if (!response.data) {
      throw new Error("Amadeus API returned an empty response");
    }
    // Devolver los Resultados
    return response.data;


    // Manejo de Errores
  } catch (error: any) {
    console.error("Error fetching flights:", error);
    // si presenta algun error reponde por medio de un Json
    if (error.response) {
      console.error("Full API error response:", JSON.stringify(error.response.data, null, 2)); //DEBUG
    }
    // Si la API no proporciona un mensaje de error, se usa error.message
    throw new Error(`Amadeus API error: ${error.response?.data?.errors?.[0]?.detail || error.message || "Unknown error"}`);
  }
}
