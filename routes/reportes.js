const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
    getVehiclesInventory,
    getFCASales,
    getSalesCurrentMonthFCA
} = require("../controllers/reportes");

const router = Router();

//Obtener todas las Aseguradoras - Publico
router.get("/FCA/sales_with_date", getFCASales);

router.get("/FCA/Inventario", getVehiclesInventory);

router.get("/FCA/monthly_sales", getSalesCurrentMonthFCA);


module.exports = router;
