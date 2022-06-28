const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { existeAseguradoraPorId } =  require("../helpers/db-validators");

const {
  obtenerAseguradoras,
  crearAseguradora,
  borrarAseguradora,
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

router.delete("/", [
  validarJWT,
  check("id", "No es un Id de mongo valido").isMongoId(),
  validarCampos,
  check("id").custom(existeAseguradoraPorId),
  validarCampos
],borrarAseguradora);

module.exports = router;
