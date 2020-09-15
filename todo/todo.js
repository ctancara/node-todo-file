const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo guardar', err);
    });
}


const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
        // console.log(listadoPorHacer);        
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}


const getListado = (completado) => {
    cargarDB();

    // console.log(completado);
    if (completado === undefined) {
        return listadoPorHacer;
    } else {
        let nuevoListado = listadoPorHacer.filter(tarea => {
            if (completado === 'true')
                boolEstado = true;
            else
                boolEstado = false;

            return tarea.completado === boolEstado;
        });
        return nuevoListado;
    }
}


const actualizar = (descripcion, completado = true) => {
    cargarDB();

    // let index = listadoPorHacer.findIndex(tarea => {
    //     return tarea.descripcion === descripcion;
    // });
    // La linea siguiente es equivalente al codigo comentado arriba
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    // let nuevoListado = listadoPorHacer.filter(tarea => {
    //     return tarea.descripcion !== descripcion
    // });
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

    // Otra forma de realizar el borrado
    // let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    // if (index >= 0) {
    //     listadoPorHacer.splice(index, 1);
    //     guardarDB();
    //     return true;
    // } else {
    //     return false;
    // }

}

module.exports = {
    crear,
    guardarDB,
    getListado,
    actualizar,
    borrar
}