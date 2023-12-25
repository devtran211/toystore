var express = require('express');
var router = express.Router();
var FigureModel = require('../../models/FigureModel');
var BrandModel = require('../../models/BrandModel');

//URL: localhost:3001/mobile
router.get('/', async (req, res) => {
   var figures = await FigureModel.find({}).populate('brand');
   //Path: views/mobile/index.hbsS
   res.render('figure/index', {figures});
})

// router.get('/customer', async (req, res) => {
//    var figures = await FigureModel.find({}).populate('brand');
//    //Path: views/mobile/index.hbs
//    res.render('figure/list', { figures });
// })

router.get('/add', async (req, res) => {
   var brands = await BrandModel.find({});
   res.render('figure/add', { brands });
})

router.post('/add', async (req, res) => {
   var figures = req.body;
   await FigureModel.create(figures);
   res.redirect('/figure');
})

router.get('/delete/:id', async (req, res) => {
   await FigureModel.findByIdAndDelete(req.params.id);
   res.redirect('/figure');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var figure = await FigureModel.findById(id);
   var brands = await BrandModel.find({});
   res.render('figure/edit', { figure, brands });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var figure = req.body;
   try {
      await FigureModel.findByIdAndUpdate(id, figure);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/figure');
})

router.get('/sort/asc', async (req, res) => {
   //SQL: SELECT * FROM mobiles ORDER BY model
   var figures = await FigureModel.find().populate('brand').sort({ model: 1 });
   res.render('mobile/index', { figures })
})

router.get('/sort/desc', async (req, res) => {
   //SQL: SELECT * FROM mobiles ORDER BY model DESC
   var figures = await FigureModel.find().populate('brand').sort({ model: -1 });
   res.render('mobile/index', { figures })
})

router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   //SQL: SELECT * FROM mobiles WHERE model LIKE '%keyword%'
   var figures = await FigureModel.find({ model: new RegExp(keyword, "i") }).populate('brand');
   res.render('mobile/index', { figures })
})

module.exports = router;