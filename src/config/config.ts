import dotenv from "dotenv";

dotenv.config();

export default {
  AMADEUS_API_KEY: process.env.AMADEUS_API_KEY!,
  AMADEUS_API_SECRET: process.env.AMADEUS_API_SECRET!,
  PORT: process.env.PORT || 3000
};
