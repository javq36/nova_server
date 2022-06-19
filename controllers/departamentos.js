const { response } = require("express");
const { Categoria, Departamento } = require("../models");

const obtenerDepartamentos = async(req, res = response) => {

    const departamentos = await Departamento.find();
  
    res.status(200).json({
        departamentos
    });
};


module.exports = {
  obtenerDepartamentos,
};
