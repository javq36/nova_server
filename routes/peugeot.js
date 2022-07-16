const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
    getPeugeotVehiclesInventory,
    getPeugeotSalesWithDate,
    getPeugeotSalesCurrentMonth
} = require("../controllers/peugeot");

const router = Router();

//Obtener todas las Aseguradoras - Publico
router.get("/sales_with_date", getPeugeotSalesWithDate);

router.get("/Inventario", getPeugeotVehiclesInventory);

router.get("/monthly_sales", getPeugeotSalesCurrentMonth);


module.exports = router;
