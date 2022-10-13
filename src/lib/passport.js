import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { pool } from "../database.js";
import * as helpers from "./helpers.js";

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "correo_electronico",
      passwordField: "contraseña",
      passReqToCallback: true,
    },
    async (req, correo_electronico, contraseña, done) => {
      const [rows] = await pool.query(
        "SELECT * FROM usuarios WHERE correo_electronico = ?",[correo_electronico]);

      if (!rows.length) return done(null, false, req.flash("error", "Ningún usuario encontrado"));

      const user = rows[0];
      console.log(user)
      const validPassword = await helpers.matchPassword(
        contraseña,
        user.contraseña
      );

      if (!validPassword) return done(null, false, req.flash("error", "Contraseña incorrecta"));

      done(null, user, req.flash("success", "Bienvenido " + user.username));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id_usuarios);
  console.log("user ",user)
});

passport.deserializeUser(async (id_usuarios, done) => {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE id_usuarios = ?", [id_usuarios]);
  done(null, rows[0]);
});
