var express = require('express');
var router = express.Router();
var Figure = require('../models/FigureModel')

/* GET home page. */
router.get('/', function(req, res, next) {
  Figure.find({})
    .then(figures => res.render('index', {figures}))
    .catch(next)
  //res.render('home');
});
module.exports = router;
