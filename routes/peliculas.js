//Nombre del autor: Sandoval Rodríguez Lendy Joanna

var express = require('express');
var router = express.Router();
var request = require('request');


var mensaje = '';

var local= 'https://microserviciosunidadiii.herokuapp.com/'; // direccion microservicios


//listado
router.get('/', function (req, res, next) {
    request.get(local+"peliculas", (error, response, body) => {

        mensaje = '';
        if (error) {
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log(JSON.parse(body));

        res.render('peliculas/index', {
            mensaje: mensaje,
            title: 'Listado de peliculas',
            data: JSON.parse(body)
        });
    });
});

router.get('/add', (req, res) => {
    mensaje = 'Agregando Película';

    res.render('peliculas/add', {
        mensaje: mensaje,
        title: 'Agregar Película',
        IdPelicula: '',
        Nombre: '',
        Genero: '',
        Duracion: '',
        FechaEstreno: '',
        Descripcion: ''
    });
});

router.post('/add', function (req, res, next) {
    //Extrae los datos enviados por la forma
    let IdPelicula = req.body.IdPelicula;
    let Nombre = req.body.Nombre;
    let Genero = req.body.Genero;
    let Duracion = req.body.Duracion;
    let FechaEstreno = req.body.FechaEstreno;
    let Descripcion = req.body.Descripcion;
    let errors = false;
    // Si no hay errores
    if (!errors) {
        //Encapsula datos de la forma
        var datosForma = {
            IdPelicula: IdPelicula,
            Nombre: Nombre,
            Genero: Genero,
            Duracion: Duracion,
            FechaEstreno: FechaEstreno,
            Descripcion: Descripcion
        }
        //Invoca al Microservicio
        request.post({ url: local+"peliculas", json: datosForma }, (error, response, body) => {

            mensaje = 'El dato se ha agregado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/peliculas'); //Redirige a Listado de películas
        });
    }
});


router.get('/delete/:idpelicula', (req, res) => {
    console.log('eliminando');

    id = req.params.idvideojuego;
    mensaje = 'Eliminando película con número de Control' + id;
    console.log(mensaje);

    if (id) {

        URI = local+"peliculas/" + id;
        request.delete(URI, (error, response, body) => {
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/peliculas ');
        });
    }

});

//Modificar
router.get('/update/:idpelicula', (req, res) => {
    id = req.params.idvideojuego;
    mensaje = 'Modificando Película con id: ' + id;
    console.log(mensaje);
    var PeliculaFind;
    //Busca si existe la película de acuerdo al id
    URI = local+"peliculas/" + id;
    console.log('URI: ' + URI);
    request.get(URI, (error, response, body) => {
        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log("Película Encontrada ===>");
        console.log(body);
        //Despliega pantalla para modificar de Estudiante
        
        res.render('peliculas/edit', {
            mensaje: mensaje,
            title: 'Modificando Película', //Título de la página
            IdPelicula: JSON.parse(body).IdPelicula,
            Nombre: JSON.parse(body).Nombre,
            Genero: JSON.parse(body).Genero,
            Duracion: JSON.parse(body).Duracion,
            FechaEstreno: JSON.parse(body).FechaEstreno,
            Descripcion: JSON.parse(body).Descripcion
        });
    });

});

router.post('/update', function (req, res, next) {
    console.log('Modificando una Película');
    //Extrae los datos enviados por la forma
    let IdPelicula = req.body.IdPelicula;
    let Nombre = req.body.Nombre;
    let Genero = req.body.Genero;
    let errors = false;
    // Si no hay errores
    if (!errors) {
        //Encapsula datos provenientes de la forma
        var datosForma = {
            IdPelicula: IdPelicula,
            Nombre: Nombre,
            Genero: Genero
        }
        //Invoca al Microservicio de modificar
        request.put({ url: local+"peliculas", json: datosForma },
            (error, response, body) => {
                mensaje = 'El dato se ha modificado con éxito';
                if (error) {
                    console.log(error);
                    mensaje = 'Error: ' + error;
                }
                console.log(response);
                res.redirect('/peliculas'); //Redirige a Listado de Estudiantes
            });
    }
});


module.exports = router;