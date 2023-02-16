/*
  Rutas de Events
  host + /api/events
*/

const express = require("express");
const { check } = require("express-validator");
const {
   getEventos,
   crearEvento,
   actualizarEvento,
   eliminarEvento
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = express.Router();

router.use(validarJWT);
// Vaidacion del JWT
router.get("/", getEventos);
// Crear Evento
router.post(
   "/",
   [
      check("title", "El titulo es obligatorio").not().notEmpty(),
      check("start", "fecha de inicio es obligatoria").custom(isDate),
      check("end", "fecha final es obligatoria").custom(isDate),
      validarCampos
   ],

   crearEvento
);
//Actualizar evento
router.put(
   "/:id",
   [
      check("title", "El titulo es obligatorio").not().notEmpty(),
      check("start", "fecha de inicio es obligatoria").custom(isDate),
      check("end", "fecha final es obligatoria").custom(isDate),
      validarCampos
   ],
   actualizarEvento
);
//borrar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
