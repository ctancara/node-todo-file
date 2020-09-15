const descripcion = {
    alias: 'd',
    demand: true,
    desc: 'Descripción de la tarea por hacer'
}

const completado = {
    alias: 'c',
    default: true
}

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', { descripcion })
    .command('actualizar', 'Actualiza el estado completado de una tarea', { descripcion, completado })
    .command('listar', 'Lista las tareas segun su estado', {
        completado: {
            alias: 'c',
            default: undefined
        }
    })
    .command('borrar', 'Borra una tarea por hacer', { descripcion })
    .help()
    .argv;


module.exports = {
    argv
}