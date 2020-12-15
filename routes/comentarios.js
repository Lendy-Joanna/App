// Nombre del autor: Sandoval Rodríguez Lendy Joanna

var express = require('express');
var router = express.Router();
var request = require('request');


var mensaje = '';
var data1= [];
var data2= [];
var local= 'https://microserviciosunidadiii.herokuapp.com/'; //Esta es la direccion de los microservicios

//listado
router.get('/', function (req, res, next) {
    request.get(local+"comentarios", (error, response, body) => {

        mensaje = '';
        if (error) {
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log(JSON.parse(body));

        res.render('comentarios/index', {
            mensaje: mensaje,
            title: 'Listado de comentarios',
            data: JSON.parse(body)
        });
    });
});

router.get('/add', (req, res) => {
    mensaje = 'Agregando Comentario';

   
   request.get(local+"usuarios", (error, response, body) => {

        mensaje = '';
        if (error) {
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        
        data2 = JSON.parse(body);
        console.log(data2);
        
    });
    request.get(local+"peliculas", (error, response, body) => {

        mensaje = '';
        if (error) {
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        
        data1 = JSON.parse(body);
        console.log(data1);
        
    });
    res.render('comentarios/add', {
        mensaje: mensaje,
        title: 'Agregar Comentario',
        datos1: data1,
        datos2: data2
       
    });
    
});

router.post('/add', function (req, res, next) {
    //Extrae los datos enviados por la forma
    let IdComentario = req.body.IdComentario;
    let IdPelicula = req.body.IdPelicula;
    let IdUsuario = req.body.IdUsuario;
    let Analisis = req.body.Analisis;
    let Calificacion = req.body.Calificacion;
    let errors = false;
    // Si no hay errores
    if (!errors) {
        //Encapsula datos de la forma
        var datosForma = {
            IdComentario: IdComentario,
            IdPelicula: IdPelicula,
            IdUsuario: IdUsuario,
            Analisis: Analisis,
            Calificacion: Calificacion
        }
        //Invoca al Microservicio
        request.post({ url: local+"comentarios", json: datosForma }, (error, response, body) => {

            mensaje = 'El dato se ha agregado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/comentarios'); //Redirige a Listado de películas
        });
    }
});


router.get('/delete/:idcomentario', (req, res) => {
    console.log('eliminando');

    id = req.params.idregistro;
    mensaje = 'Eliminando comentario con id: ' + id;
    console.log(mensaje);

    if (id) {

        URI = local+"comentarios/" + id;
        request.delete(URI, (error, response, body) => {
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/comentarios');
        });
    }

});

//Modificar
router.get('/update/:idcomentario', (req, res) => {
    id = req.params.idregistro;
    mensaje = 'Modificando comentario con id: ' + id;
    console.log(mensaje);
    var PeliculaFind;
    //Busca si existe la película de acuerdo al id
    URI = local+"comentarios/" + id;
    console.log('URI: ' + URI);
    request.get(URI, (error, response, body) => {
        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log("Comentario Encontrado ===>");
        console.log(body);
        //Despliega pantalla para modificar el usuario

        res.render('comentarios/edit', {
            mensaje: mensaje,
            title: 'Modificando comentario', //Título de la página
            IdComentario: JSON.parse(body).IdComentario,
            IdPelicula: JSON.parse(body).IdPelicula,
            IdUsuario: JSON.parse(body).IdUsuario,
            Analisis: JSON.parse(body).Analisis,
            Calificacion: JSON.parse(body).Calificacion
        });
    });

});

router.post('/update', function (req, res, next) {
    console.log('Modificando una Pelicula');
    //Extrae los datos enviados por la forma
    let IdComentario = req.body.IdComentario;
    let Analisis = req.body.Analisis;
    let Calificacion = req.body.Calificacion;
    let errors = false;
    // Si no hay errores
    if (!errors) {
        //Encapsula datos provenientes de la forma
        var datosForma = {
            IdComentario: IdComentario,
            Analisis: Analisis,
            Calificacion: Calificacion
        }
        //Invoca al Microservicio de modificar
        request.put({ url: local+"comentarios", json: datosForma },
            (error, response, body) => {
                mensaje = 'El dato se ha modificado con éxito';
                if (error) {
                    console.log(error);
                    mensaje = 'Error: ' + error;
                }
                console.log(response);
                res.redirect('/comentarios'); //Redirige a Listado de comentarios
            });
    }
});


module.exports = router;