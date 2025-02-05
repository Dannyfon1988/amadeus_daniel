Amadeus Flight Search

Descripción

Este proyecto es una aplicación que utiliza la API de Amadeus para buscar vuelos entre distintas ciudades, permitiendo aplicar filtros como precio máximo, vuelos sin escalas, y más.

Tecnologías Utilizadas

Node.js (Backend)

Express.js (Servidor web)

Axios (Consumo de API)

Amadeus API (Proveedor de datos de vuelos)

TypeScript (Opcional, para mejor tipado y mantenibilidad)

Instalación

1. Clonar el repositorio

git clone https://github.com/Dannyfon1988/amadeus_daniel.git

2. Instalar dependencias

npm install

3. Configuración

Crea un archivo .env en la raíz del proyecto y añade las credenciales de Amadeus:

AMADEUS_API_KEY=tu_client_id
AMADEUS_API_SECRET=tu_client_secret
PORT=3000

4. Ejecutar el servidor

npm start

El servidor se ejecutará en http://localhost:3000.



Uso de la API

1. Obtener token de autenticación

El sistema se autenticará automáticamente al iniciar el servidor.

2. Buscar vuelos

Ejemplo de solicitud:

http://localhost:3000/flights/search?origin=BCN&destination=MIA&departureDate=2025-04-15&adults=2&maxPrice=1200&nonStop=true

http://localhost:3000/flights/search?origin=MAD&destination=JFK&departureDate=2025-03-10


Errores comunes y soluciones

❌ NetworkError: undefined statusCode

✅ Verifica que las variables de entorno están configuradas correctamente.

❌ Error: Amadeus API error: Unknown error

✅ Asegúrate de que la API de Amadeus no está caída aquí
