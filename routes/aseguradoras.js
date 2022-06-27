const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  obtenerAseguradoras,
  crearAseguradora,
} = require("../controllers/aseguradoras");

const router = Router();

//Obtener todas las Aseguradoras - Publico
router.get("/", obtenerAseguradoras);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es Obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearAseguradora
);

module.exports = router;
