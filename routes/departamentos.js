const { Router } = require("express");

const  { obtenerDepartamentos } = require("../controllers/departamentos") ;

const router = Router();

//Obtener todas las categorias - Publico
router.get("/", obtenerDepartamentos);

module.exports = router;
