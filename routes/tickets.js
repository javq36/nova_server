const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerProductos,
  borrarProducto,
} = require("../controllers/productos");
const {
  crearTicket,
  obtenerTiketsEmpledo,
  actualizarTicket,
} = require("../controllers/tickets");
const { existeProductoPorId } = require("../helpers/db-validators");
const { esAdminRole } = require("../middlewares");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

/**
 * {{url}}/api/categorias
 */

//Obtener todas las categorias - Publico
router.get("/", obtenerProductos);

//Obtener tickets de empleado por id de emmpleado - Publico
router.get(
  "/employee/:id",
  [check("id", "No es un Id de mongo valido").isMongoId(), validarCampos],
  obtenerTiketsEmpledo
);

//crear categoria - Privado - culaquier persona con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("subject", "El asunto es Obligatorio").not().isEmpty(),
    check("description", "La descripcion es Obligatoria").not().isEmpty(),
    validarCampos,
  ],
  crearTicket
);

//Actualizar Ticket - Privado - culaquier persona con un token valido
router.put("/", [validarJWT, validarCampos], actualizarTicket);

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
