import express from "express";
import cors from "cors";
import flightRoutes from "./routes/flightRoutes"; 

const app = express();

app.use(cors());
app.use(express.json());
app.use("/flights", flightRoutes); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


