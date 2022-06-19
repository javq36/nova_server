const { Schema, model } = require('mongoose');

const TicketSchema = Schema({
    subject: {
        type: String,
        required: [true, 'El asunto es obligatorio'],
    },
    state: {
        type: String,
        default: 'Pendiente',
        required: true
    },
    description: {
        type: String,
        default: '',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    file: { type: String },
    time: { type: Date, default: Date.now },
});

TicketSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Ticket', TicketSchema );