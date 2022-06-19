const { Schema, model } = require('mongoose');

const DepartamentoSchema = Schema({
    departamento: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});


module.exports = model( 'Departamento', DepartamentoSchema );
