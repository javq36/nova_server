const { Categoria, Producto, Ticket } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeCategoriaPorId = async( id ) => {

    // Verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeProductoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


const existeTicketPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Ticket.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El ticket con id ${ id } no existe`);
    }
}

/* Validar Colecciones PERMITIDAS*/
const coleccionesPermitidas = ( coleccion = '', coleciones = [] ) =>{
    const incluida = coleciones.includes(coleccion);

    if ( !incluida ) {
        throw new Error(`La colección ${coleccion} no es permitida, Deberia ser una de estas: ${coleciones}`)
    }

    return true;
}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas,
    existeTicketPorId
}

