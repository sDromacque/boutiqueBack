const mongoose = require( 'mongoose' );

let BoutiqueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  loc: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

let Boutique = mongoose.model('Boutique', BoutiqueSchema);

module.exports = Boutique;
