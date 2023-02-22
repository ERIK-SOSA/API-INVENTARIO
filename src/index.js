import app from "./app.js";
import {port} from './config.js'

await import('./database.js');
app.listen(3000);
console.log("Servidor corriendo en el puerto", process.env.PORT);

console.log("Hola mundo")
