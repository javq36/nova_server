const { response } = require("express");
const { Aseguradora } = require("../models");

const obtenerAseguradoras = async (req, res = response) => {
  /* Finding all the aseguradoras in the database. */
  const aseguradoras = await Aseguradora.find();

  /* Checking if the array is empty or not. */
  if (aseguradoras.length !== 0) {
    return res.status(200).json({
      aseguradoras,
    });
  } else {
    return res.status(400).json({
      ok: false,
      msg: "No hay aseguradoras",
    });
  }
};

const crearAseguradora = async (req, res = response) => {
  /* Taking the value of the nombre property from the request body and converting it to uppercase. */
  const nombre = req.body.nombre.toUpperCase();

  /* Finding the aseguradora with the same name as the one that is being created. */
  const aseguradoraDB = await Aseguradora.findOne({ nombre });

  /* Checking if the aseguradoraDB variable is empty or not. If it is not empty, it will return a
  response with a status of 400 and a message saying that the aseguradora already exists. */
  if (aseguradoraDB) {
    return res.status(400).json({
      msg: `La Aseguradora ${aseguradoraDB.nombre} ya existe.`,
    });
  }

  //Generar la data a guardar

  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  /* Creating a new instance of the Aseguradora model. */
  const aseguradora = new Aseguradora(data);

  //Grabar en DB
  /* Saving the aseguradora to the database. */
  try {
    await aseguradora.save();
    res.status(201).json(aseguradora);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }

};

module.exports = {
  obtenerAseguradoras,
  crearAseguradora
};
