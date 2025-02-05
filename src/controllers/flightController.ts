import { Request, Response } from "express";
import { searchFlights } from "../services/amadeusService";

// analisis de labusqueda del vuelo 

export const analyzeFlights = async (req: Request, res: Response): Promise<void> => {
  try {
    const { origin, departureDateRange } = req.query;

    if (!origin || !departureDateRange || typeof departureDateRange !== "string" || !departureDateRange.includes(",")) {
        res.status(400).json({ error: "Missing or incorrect required parameters: origin, departureDateRange" });
        return;
      }      

    const flights = await searchFlights(origin as string, "ANY", departureDateRange as string, "ANY", "ANY", false);

    if (!flights || flights.length === 0) {
      res.json({ message: "No flights found for analysis" });
      return;
    }

    

    const totalFlights = flights.length;
    const prices = flights.map((f: any) => parseFloat(f.price.total));
    const averagePrice = prices.reduce((sum: number, p: number) => sum + p, 0);
    const durations = flights.map((f: any) => f.itineraries[0].duration);

    const durationsInMinutes = durations.map((d: string) => {
        const match = d.match(/PT(\d+)H(\d+)?M?/);
        if (!match) return 0;
        const hours = parseInt(match[1], 10);
        const minutes = match[2] ? parseInt(match[2], 10) : 0;
        return hours * 60 + minutes;
      });

      
      

    const longestFlight = Math.max(...durationsInMinutes);
    const shortestFlight = Math.min(...durationsInMinutes);

    res.json({
      totalFlights,
      averagePrice: averagePrice.toFixed(2),
      longestFlight,
      shortestFlight,
    });
  } catch (error) {
    console.error("Error analyzing flights:", error);
    res.status(500).json({ error: "Error analyzing flights" });
  }
};
