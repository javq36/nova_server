const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");
const { existeCategoriaPorId, existeProductoPorId } = require("../helpers/db-validators");
const { esAdminRole } = require("../middlewares");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

/**
 * {{url}}/api/categorias
 */

//Obtener todas las categorias - Publico
router.get("/", obtenerProductos);

//Obtener una categoria por id - Publico
router.get(
  "/:id",
  [
    check("id", "No es un Id de mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

//crear categoria - Privado - culaquier persona con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es Obligatorio").not().isEmpty(),
    check("categoria", "No es un ID de Mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

//Actualizar categoria - Privado - culaquier persona con un token valido
router.put(
  "/:id",
  [
    validarJWT,
    check("id").custom(existeProductoPorId),
    check("categoria", "No es un ID de Mongo").isMongoId(),
    validarCampos,
  ],
  actualizarProducto
);

//Borrar categoria - Admin - culaquier persona con un token valido
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un Id de mongo valido").isMongoId(),
    validarCampos,
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
