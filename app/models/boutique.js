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
  // loc: {
  //   type: {
  //     type: String,
  //     default:'Point'
  //   },
  //   coordinates: [Number]
  // },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

let Boutique = mongoose.model('Boutique', BoutiqueSchema);

module.exports = Boutique;