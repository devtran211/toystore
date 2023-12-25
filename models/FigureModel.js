var mongoose = require('mongoose');
var FigureSchema = mongoose.Schema({
   name: String,
   price: String,
   image: String,
   brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands'  // 'brands': collection
   },
   color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'colors'  // 
   }
});
//Relationship : figuress (many) - brands (one)

var FigureModel = mongoose.model('figures', FigureSchema); // 'figures' : collection
module.exports = FigureModel;