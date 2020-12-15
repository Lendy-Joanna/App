//Autor: Sandoval Rodríguez Lendy Joanna

var express = require('express');
var router = express.Router();
var request = require('request');


var mensaje = '';

var local= 'https://microserviciosunidadiii.herokuapp.com/'; //direccion microservicios
//listado
router.get('/', function (req, res, next) {
    request.get(local+"usuarios", (error, response, body) => {

        mensaje = '';
        if (error) {
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log(JSON.parse(body));

        res.render('usuarios/index', {
            mensaje: mensaje,
            title: 'Listado de Usuarios',
            data: JSON.parse(body)
        });
    });
});

router.get('/add', (req, res) => {
    mensaje = 'Agregando Usuario';

    res.render('usuarios/add', {
        mensaje: mensaje,
        title: 'Agregar Usuario',
        IdUsuario: '',
        UserName: '',
        Nombre: '',
        Apellidos: '',
        Edad: ''
    });
});

router.post('/add', function (req, res, next) {
    //Extrae los datos enviados por la forma
    let IdUsuario = req.body.IdUsuario;
    let UserName = req.body.UserName;
    let Nombre = req.body.Nombre;
    let Apellidos = req.body.Apellidos;
    let Edad = req.body.Edad;
    let errors = false;
    // Si no hay errores
    if (!errors) {
        //Encapsula datos de la forma
        var datosForma = {
            IdUsuario: IdUsuario,
            UserName: UserName,
            Nombre: Nombre,            
            Apellidos: Apellidos,
            Edad: Edad
        }
        //Invoca al Microservicio
        request.post({ url: local+"usuarios", json: datosForma }, (error, response, body) => {

            mensaje = 'El dato se ha agregado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/usuarios'); //Redirige a Listado de usuarios
        });
    }
});


router.get('/delete/:idusuario', (req, res) => {
    console.log('eliminando');

    id = req.params.idusuario;
    mensaje = 'Eliminando usuario con numero de Control' + id;
    console.log(mensaje);

    if (id) {

        URI = local+"usuarios/" + id;
        request.delete(URI, (error, response, body) => {
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/usuarios');
        });
    }

});

//Modificar
router.get('/update/:idusuario', (req, res) => {
    id = req.params.idjugador;
    mensaje = 'Modificando Usuario con id: ' + id;
    console.log(mensaje);
    var PeliculaFind;
    //Busca si existe el usuario de acuerdo al id
    URI = local+"usuarios/" + id;
    console.log('URI: ' + URI);
    request.get(URI, (error, response, body) => {
        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log("Usuario Encontrado ===>");
        console.log(body);
        //Despliega pantalla para modificar de Estudiante
        
        res.render('usuarios/edit', {
            mensaje: mensaje,
            title: 'Modificando Usuario', //Título de la página
            IdUsuario: JSON.parse(body).IdUsuario,
            UserName: JSON.parse(body).UserName,
            Nombre: JSON.parse(body).Nombre,            
            Apellidos: JSON.parse(body).Apellidos,
            Edad: JSON.parse(body).Edad
        });
    });

});

router.post('/update', function (req, res, next) {
    console.log('Modificando un Usuario');
    //Extrae los datos enviados por la forma
    let IdUsuario = req.body.IdUsuario;
    let Nombre = req.body.Nombre;
    let Apellidos = req.body.Apellidos;
    let errors = false;
    // Si no hay errores
    if (!errors) {
        //Encapsula datos provenientes de la forma
        var datosForma = {
            IdUsuario: IdUsuario,
            Nombre: Nombre,
            Apellidos: Apellidos
        }
        //Invoca al Microservicio de modificar
        request.put({ url: local+"usuarios", json: datosForma },
            (error, response, body) => {
                mensaje = 'El dato se ha modificado con éxito';
                if (error) {
                    console.log(error);
                    mensaje = 'Error: ' + error;
                }
                console.log(response);
                res.redirect('/usuarios'); //Redirige a Listado de Usuarios
            });
    }
});


module.exports = router;