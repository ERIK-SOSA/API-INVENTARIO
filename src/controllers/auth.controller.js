import passport from "passport";
import { encryptPassword } from "../lib/helpers.js";
import { pool } from "../database.js";

export const renderSignUp = (req, res) => {
  res.render("auth/signup");
};

export const signUp = async (req, res, next) => {
  const { nombre_completo, correo_electronico, contraseña1, contraseña2, fecha_nacimiento, identificacion } = req.body;

  console.log(req.body)
  console.log(req.query)

  if (contraseña1 !== contraseña2) {
    req.flash("message", "Contraseña no coincide");
    return res.redirect("/signup");
  }

  const newUser = {
    nombre_completo,
    correo_electronico,
    fecha_nacimiento,
    identificacion
  };

  newUser.contraseña = await encryptPassword(contraseña1);

  // Saving in the Database
  const [result] = await pool.query("INSERT INTO usuarios SET ? ", newUser);
  newUser.id = result.insertId;

  req.login(newUser, (err) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/profile");
  });
}

export const renderSignIn = (req, res, next) => {
  res.render("auth/signin");
};

export const signIn = passport.authenticate("local.signin", {
  successRedirect: "/profile",
  failureRedirect: "/signin",
  failureMessage: true,
  failureFlash: true,
});

export const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};
