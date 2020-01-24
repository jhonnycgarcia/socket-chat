const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');
const usuarios = new Usuarios();


io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => { // al conectarse
        if (!data.nombre || !data.sala) { return callback({ error: true, message: 'El nombre y sala son requeridos' }); }

        client.join(data.sala); // conectarse a la sala
        usuarios.agregarPersona(client.id, data.nombre, data.sala); // agregar un usuario
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSalas(data.sala));
        callback(usuarios.getPersonasPorSalas(data.sala));
    });

    client.on('disconnect', () => { // Desconectarse
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `<<${personaBorrada.nombre}>> abandono el chat`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSalas(personaBorrada.sala));
    });

    client.on('crearMensaje', (data) => { // Crear un mensaje
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    // Mensajes privados
    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('crearMensaje', crearMensaje(persona.nombre, data.mensaje));
    });
});