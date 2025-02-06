

import { Request, Response } from "express"; // objeto de solicitud y respuesta
import { searchFlights } from "../services/amadeusService"; // funcion importada obtencion de informacion de vuelos 

// analisis de labusqueda del vuelo 

export const analyzeFlights = async (req: Request, res: Response): Promise<void> => { // "funcion asincrona" espera los resultados de searchFlights
  try {
    const { origin, departureDateRange } = req.query;

    if (!origin || !departureDateRange || typeof departureDateRange !== "string" || !departureDateRange.includes(",")) { //realiza verificacion de parametros, que sea una cadena de texto.
      //Se valida que departureDateRange contenga una coma (,) para garantizar que sea un rango de fechas válido.
        res.status(400).json({ error: "Missing or incorrect required parameters: origin, departureDateRange" }); //Si alguna de estas condiciones no se cumple, se devuelve un error 400
        return;
      }      

    const flights = await searchFlights(origin as string, "ANY", departureDateRange as string, "ANY", "ANY", false);

    //se llama a searchFlights, pasando los siguientes parámetros
    // origin as string → El código de aeropuerto de origen.
    // departureDateRange as string → Rango de fechas para la salida.
    // "ANY" → Clase de cabina (puede ser cualquiera).
    // "ANY" → Tipo de tarifa (puede ser cualquiera).
    // false → Posible parámetro booleano, probablemente para filtrar vuelos.

    if (!flights || flights.length === 0) { // Si flights es null, undefined o un array vacío, significa que no se encontraron vuelos.
      res.json({ message: "No flights found for analysis" }); // Se devuelve una respuesta JSON con el mensaje
      return;
    }

// Calculo de Metricas    

    const totalFlights = flights.length; // Se almacena la cantidad total de vuelos encontrados
    const prices = flights.map((f: any) => parseFloat(f.price.total)); // Se extraen los precios de los vuelos (f.price.total) y se convierten en números (parseFloat).
    const averagePrice = prices.reduce((sum: number, p: number) => sum + p, 0) / totalFlights;
    const durations = flights.map((f: any) => f.itineraries[0].duration);  // Se extraen las duraciones de los vuelos desde f.itineraries[0].duration.

    
    // Conversión de duraciones a minutos
    const durationsInMinutes = durations.map((d: string) => {
        const match = d.match(/PT(\d+)H(\d+)?M?/);
        if (!match) return 0;
        const hours = parseInt(match[1], 10);
        const minutes = match[2] ? parseInt(match[2], 10) : 0;
        return hours * 60 + minutes;
      });


// Determinación de vuelos más largos y más cortos
    const longestFlight = Math.max(...durationsInMinutes);
    const shortestFlight = Math.min(...durationsInMinutes);


// Respuesta final
    res.json({
      totalFlights,
      averagePrice: averagePrice.toFixed(2),
      longestFlight,
      shortestFlight,
    });

// manejo de Errores 
  } catch (error) {
    console.error("Error analyzing flights:", error);
    res.status(500).json({ error: "Error analyzing flights" });
  }
};
