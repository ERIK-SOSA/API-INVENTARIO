import { body } from "express-validator";

export const signupSchema = [
    body("nombre_completo").isLength({ min: 3 }).withMessage("El nombre completo debe tener al menos 3 caracteres"),
    body("correo_electronico").isEmail().withMessage("El correo no es válido"),
    body("contraseña1").isLength({ min: 6 }).withMessage("La contraseña debe contener 6 caracteres como mínimo"),
    body("contraseña2").isLength({ min: 6 }).withMessage("La contraseña debe contener 6 caracteres como mínimo"),
]