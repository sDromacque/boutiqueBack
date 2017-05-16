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
  address:{
    zipCode: {
      type: Number,
      required: true,
      min: 5,
      max: 5
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    streetAddress: {
      type: String,
      required: true
    }
  },
  tags: [],
  ranking: {
    type: Number
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
