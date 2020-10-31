var express = require('express');
const passport = require('passport');
const { route } = require('.');
const { render } = require('../app');
var router = express.Router();
const User = require('../model/user');

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//peticion post

router.post('/signup', function(req, res, next) {
  console.log(req.body);
  let user = new User({
    username: req.body.username,  
    email: req.body.email,
    nombre:req.body.nombre,
    edad:req.body.edad,
    password: req.body.password,
    Tipocuenta:req.body.Tipocuenta
      
  });

  //Guarda un registro en Mongo
  user.save((err, response) => {
     if (err) {req.flash('error_msg','Error al crear el Usuario')
     res.redirect('/signup')}else{
     req.flash('success_msg','Usuario Creado')
     res.redirect('/login');}
     
    
  });


});

router.post("/login", function(req, res, next) { 
 let username=req.body.username;
 let password=req.body.password;

  User.find({username,password}, (err, user) => {
    if (err){
      req.flash('error_msg','No existe el usuario');
        res.redirect('/login');
   }
    else{
      if(!user || user=="" ){ 
        req.flash('error_msg','El usuario o la contraseña no son validos');
         res.redirect('/login');}
      else{
        res.redirect('/');
      }
    }
  });
});
router.route('/ouath/google').post(passport.authenticate('googleToken',{session: false}));


module.exports = router;

