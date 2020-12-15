var express = require('express');
var router = express.Router();
const stripe = require('stripe')('sk_test_51HhtYfIoCf79dHKpvzQbzFl7IC2HS4ar7BVdssmMbTjIVF9R9ldLoSBnp2OCxpYX09tUODOBurf1jWlgj6BqMtLr00DJ7lItzf');
/*var nombres = ['Eduardo','Ángel','Diana','Espiga','Carlos','Juan',
              'Magdalena','Ignacio','Geovani','Yazmín'];

/* GET home page. Página principal home. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mi primera página', name:'Lendy Joanna Sandoval Rodríguez', 
  names:'', title2:'Lista de nombres:',nombres });

/* Ruta nueva al home */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Inicio', menuId:'inicio'});
});

router.get('/acercade', function(req, res, next) {
  res.render('acercade', {page:'Acerca de', menuId:'acercade'});
});

router.get('/ubicacion', function(req, res, next) {
  res.render('ubicacion', {page:'Ubicación', menuId:'ubicacion'});
});

router.get('/streaming', function(req, res, next) {
  res.render('streaming', {page:'Streaming', menuId:'streaming'});
});

router.get('/extras', function(req, res, next) {
  res.render('extras', {page:'Extras', menuId:'extras'});
});

router.get('/login', function(req, res, next) {
  res.render('signup', {page:'signup', menuId:'signup'});
});

router.post('/checkout', async (req, res)=>{
  const customer = await stripe.customers.create({
    email: req.body.stripeEmail,
    source:req.body.stripeToken
  });
  const charge = await stripe.charges.create({
    amount: '472',
    currency: 'usd',
    customer: customer.id,
  });
  console.log(charge.id);
  res.send('éxito');
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
