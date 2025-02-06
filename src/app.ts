import express from "express"; // Importa el framework Express.js, que facilita la creación de servidores web
import cors from "cors";  // permite que el backend acepte solicitudes de dominios distintos al suyo.
import flightRoutes from "./routes/flightRoutes"; // Importa las rutas definidas donde se manejan todas la rutas 

const app = express(); // Crea una instancia de la aplicación Express, que se usará para configurar rutas y middlewares


// Uso de middlewares
app.use(cors());
app.use(express.json());
app.use("/flights", flightRoutes);  // cualquier petición a rutas serán manejadas en el archivo flightRoutes.js

// Configuración del puerto y puesta en marcha del servidor

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


