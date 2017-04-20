const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

module.exports = (mongoose) => {
  const BoutiqueSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    loc: {
      type: mongoose.Schema.Types.Point,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  });

  BoutiqueSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
  });
  const Boutique = mongoose.model('Boutique', BoutiqueSchema);
};