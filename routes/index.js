var express = require('express');
var router = express.Router();
/*var nombres = ['Eduardo','Ángel','Diana','Espiga','Carlos','Juan',
              'Magdalena','Ignacio','Geovani','Yazmín'];

/* GET home page. Página principal home. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mi primera página', name:'Lendy Joanna Sandoval Rodríguez', 
  names:'', title2:'Lista de nombres:',nombres });
});*/

/* Ruta nueva al home */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/acercade', function(req, res, next) {
  res.render('acercade', {page:'acercade', menuId:'acercade'});
});

/*Método POST */
router.post('/',function(req, res){
  res.send('Tengo una petición con POST');
})

/*Método PUT */
router.put('/greeting',function(req, res){
  res.send('¡¡¡¡Te doy un saludo con Greeting!!!');
})

/*Método DELETE */
router.delete('/hello',function(req, res){
  res.send('Te doy un saludo con DELETE');
})

module.exports = router;
