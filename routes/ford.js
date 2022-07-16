const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
    getFordVehiclesInventory,
    getFordSalesWithDate,
    getFordSalesCurrentMonth
} = require("../controllers/ford");

const router = Router();

//Obtener todas las Aseguradoras - Publico
router.get("/sales_with_date", getFordSalesWithDate);

router.get("/Inventario", getFordVehiclesInventory);

router.get("/monthly_sales", getFordSalesCurrentMonth);


module.exports = router;
