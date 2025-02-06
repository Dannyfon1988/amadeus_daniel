import express, { Router } from "express"; // permite definir rutas en un módulo separado
import { getFlights } from "../controllers/flightSearchController";// Se importan dos funciones desde los controladores 
import { analyzeFlights } from "../controllers/flightController";

const router: Router = express.Router(); // Express permite definir rutas de manera modular, en lugar de definirlas directamente en el servidor principal.

router.get("/search", getFlights); // Define una ruta de tipo GET en la URL "/search".
router.get("/analyze", analyzeFlights); // 

export default router; // Exporta el router para que pueda ser utilizado en otros archivos del proyecto.
