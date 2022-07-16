const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
    getBajajVehiclesInventory,
    getBajajSalesWithDate,
    getBajajSalesCurrentMonth
} = require("../controllers/bajaj");

const router = Router();

//Obtener todas las Aseguradoras - Publico
router.get("/sales_with_date", getBajajSalesWithDate);

router.get("/Inventario", getBajajVehiclesInventory);

router.get("/monthly_sales", getBajajSalesCurrentMonth);


module.exports = router;
