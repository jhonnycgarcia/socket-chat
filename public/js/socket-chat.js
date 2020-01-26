var socket = io();

var params = new URLSearchParams(window.location.search); // capturar parametros URL

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    socket.emit('entrarChat', usuario, function(resp) {
        // console.log('Usuarios conectados', resp); 
        renderizarUsuarios(resp);
    });
});

socket.on('disconnect', function() { console.log('Perdimos conexión con el servidor'); });


// Enviar información
// socket.emit('crearMensaje', { usuario: 'Fernando', mensaje: 'Hola Mundo' }, function(resp) { console.log('respuesta server: ', resp); });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    renderizarMensajes(mensaje, false);
    scrollBottom(); /* console.log('Servidor:', mensaje); */
});

// Cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) { renderizarUsuarios(personas); });

// Mensaje privado
socket.on('mensajePrivado', function(mensaje) { console.log('Mensaje privado: ', mensaje); });