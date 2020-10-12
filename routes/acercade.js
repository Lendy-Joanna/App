var express = require('express');
var router = express.Router();

/* GET home page. Página Principal*/
router.get('/acercade', function(req, res, next){
    res.render('acercade', { page:'acercade', menuId:'acercade'});
});

module.exports = router;
