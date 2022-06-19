const { response } = require("express");
const { Ticket } = require("../models");

const obtenerTiketsEmpledo = async (req, res = response) => {
  const { id } = req.params;

  const tickets = await Ticket.find({
    $or: [{ user: id  }],
    $and: [{ estado: 'Pending' }],
  });

  res.status(200).json({
    tickets,
  });
};

const crearTicket = async (req, res = response) => {
  // Generar la data a guardar
  const data = {
    subject: req.body.subject.toUpperCase(),
    description: req.body.description,
    user: req.usuario._id,
  };

  const ticket = new Ticket(data);

  // Guardar DB

  try {
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(501).json("Error al guardar en la DB");
  }
};

const actualizarTicket = async (req, res = response) => {
  const { ...data } = req.body;

  const ticket = await Ticket.findByIdAndUpdate(data.id, data, { new: true });

  res.status(200).json(ticket);
};

const obtenerProducto = async (req, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json(producto);
};

const borrarProducto = async (req, res = response) => {
  const { id } = req.params;
  const productoBorrado = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(productoBorrado);
};

module.exports = {
  crearTicket,
  obtenerTiketsEmpledo,
  obtenerProducto,
  actualizarTicket,
  borrarProducto,
};
