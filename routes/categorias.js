const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");
const { esAdminRole } = require("../middlewares");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

/**
 * {{url}}/api/categorias
 */

//Obtener todas las categorias - Publico
router.get("/", obtenerCategorias);

//Obtener una categoria por id - Publico
router.get(
  "/:id",
  [
    check("id", "No es un Id de mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

//crear categoria - Privado - culaquier persona con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es Obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//Actualizar categoria - Privado - culaquier persona con un token valido
router.put("/:id",[
    validarJWT,
    check("nombre", "El nombre es Obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
] ,actualizarCategoria);

//Borrar categoria - Admin - culaquier persona con un token valido
router.delete("/:id", [
    validarJWT,
    esAdminRole,
    check("id", "No es un Id de mongo valido").isMongoId(),
    validarCampos,
    check("id").custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria);

module.exports = router;
