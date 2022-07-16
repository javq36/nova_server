const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
    getFCAVehiclesInventory,
    getFCASalesWithDate,
    getFCASalesCurrentMonth
} = require("../controllers/fca");

const router = Router();

//Obtener todas las Aseguradoras - Publico
router.get("/sales_with_date", getFCASalesWithDate);

router.get("/Inventario", getFCAVehiclesInventory);

router.get("/monthly_sales", getFCASalesCurrentMonth);


module.exports = router;
