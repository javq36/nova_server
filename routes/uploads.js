const { Router } = require("express");
const { check } = require("express-validator");
const {
  cargarArchivo,
  mostrarImagen,
  actualizarImagenClaudinary,
} = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");

const { validarCampos, validarAtchivoSubir } = require("../middlewares");

const router = Router();

router.post(
  "/:id",
  [check("id", "El id no es un ID de Mongo").isMongoId()],
  validarAtchivoSubir,
  cargarArchivo
);

/* router.put('/:coleccion/:id', [
    validarAtchivoSubir,
    check('id', 'El id no es un ID de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] )),
    validarCampos
], actualizarImagenClaudinary) */
router.put(
  "/:id",
  [
    validarAtchivoSubir,
    check("id", "El id no es un ID de Mongo").isMongoId(),
    validarCampos,
  ],
  actualizarImagenClaudinary
);

router.get(
  "/:coleccion/:id",
  [
    check("id", "El id no es un ID de Mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  mostrarImagen
);

module.exports = router;
