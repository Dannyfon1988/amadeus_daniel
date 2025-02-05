import { Request, Response } from "express";
import { searchFlights } from "../services/amadeusService";

export const getFlights = async (req: Request, res: Response): Promise<void> => {
  try {
    const { origin, destination, departureDate, duration, maxPrice, nonStop } = req.query;

    // Validación de parámetros requeridos
    if (!origin || !destination || !departureDate) {
      res.status(400).json({ error: "Missing required parameters: origin, destination, departureDate" });
      return;
    }

    // Conversión de parámetros opcionales
    const durationValue = duration ? (duration as string) : "1"; // Si no se envía, usa "1"
    const maxPriceValue = maxPrice ? (maxPrice as string) : "1000"; // Si no se envía, usa "1000"
    const nonStopValue = nonStop === "true"; // Convierte el valor a booleano

    // Llamar a la función searchFlights con los valores correctos
    const flights = await searchFlights(
      origin as string,
      destination as string, 
      departureDate as string,
      durationValue as string | undefined,
      maxPriceValue as string | undefined,
      nonStopValue as boolean
    );

    res.json({ message: "Flights found", flights });
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).json({ error: "Error fetching flights" });
  }
};
