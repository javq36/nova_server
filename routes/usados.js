const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
    getUsadosVehiclesInventory,
    getFotonSalesWithDate,
    getFotonSalesCurrentMonth
} = require("../controllers/usados");

const router = Router();

//Obtener todas las Aseguradoras - Publico
router.get("/sales_with_date", getFotonSalesWithDate);

router.get("/Inventario", getUsadosVehiclesInventory);

router.get("/monthly_sales", getFotonSalesCurrentMonth);


module.exports = router;
