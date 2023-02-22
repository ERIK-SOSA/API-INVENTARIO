import { config } from "dotenv";
config();

export const database = {
  connectionLimit: 10,
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "admin",
  password: process.env.DATABASE_PASSWORD || "Sosita.96",
  database: process.env.DATABASE_NAME || "inventariodb",
  
};

export const port = process.env.PORT || 4000;
