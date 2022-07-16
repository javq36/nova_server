const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
    getFotonVehiclesInventory,
    getFotonSalesWithDate,
    getFotonSalesCurrentMonth
} = require("../controllers/foton");

const router = Router();

//Obtener todas las Aseguradoras - Publico
router.get("/sales_with_date", getFotonSalesWithDate);

router.get("/Inventario", getFotonVehiclesInventory);

router.get("/monthly_sales", getFotonSalesCurrentMonth);


module.exports = router;
