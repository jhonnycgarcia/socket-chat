class Usuarios {
    constructor() {
        this.personas = []; // Personas conectadas en el chat
    }

    agregarPersona(id, nombre, sala) { // Agregar persona
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        // return this.personas;
    }

    getPersona(id) { // Obtener persona
        let persona = this.personas.filter(persona => persona.id === id)[0]; // Buscar persona
        return persona;
    }

    getPersonas() { // Obtener listado de personas
        return this.personas;
    }

    getPersonasPorSalas(sala) { // Personas por salas
        let personasSala = this.personas.filter(persona => persona.sala === sala);
        return personasSala;
    }

    borrarPersona(id) { // Borrar persona
        let personaBorrada = this.getPersona(id); // Capturar persona a borrar
        if (personaBorrada !== undefined) {
            this.personas = this.personas.filter(persona => persona.id !== id); // borrar persona
            return personaBorrada;
        } else { return null; }
    }
}

module.exports = {
    Usuarios
}