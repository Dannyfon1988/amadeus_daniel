import dotenv from "dotenv"; // para cargar variables de entorno desde un archivo .env

dotenv.config();//  ejecuta la función lo que permite cargar las variables definidas en el archivo .env

export default { // exporta un objeto con las configuraciones
                 // lo que permite que otros módulos del código accedan a estas variables de entorno
  AMADEUS_API_KEY: process.env.AMADEUS_API_KEY!, // ! indica que el valor nunca será undefined Se asume que esta variable siempre estará definida.


  AMADEUS_API_SECRET: process.env.AMADEUS_API_SECRET!,// Se asume que esta variable siempre estará definida.

  PORT: process.env.PORT || 3000 // asigna el valor 3000 como predeterminado.
};
