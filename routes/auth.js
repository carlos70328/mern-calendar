/*
  Rutas de Auth
  host + /api/auth
*/

const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { crearUsuario, loginUsuario, revalidarToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
   "/new",
   [
      //middlewares
      check("name", "El nombre es obligatorio").not().notEmpty(),
      check("email", "El email es obligatorio").isEmail(),
      check("password", "la contraseña debe ser de 6 caracteres").isLength({ min: 6 }),
      validarCampos
   ],
   crearUsuario
);

router.post(
   "/",
   [
      //middlewares
      check("email", "El email es obligatorio").isEmail(),
      check("password", "la contraseña debe ser de 6 caracteres").isLength({ min: 6 }),
      validarCampos
   ],
   loginUsuario
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
