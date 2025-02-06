import { Request, Response, NextFunction } from "express"; //  para dar tipado a los parámetros de la función 

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
}
