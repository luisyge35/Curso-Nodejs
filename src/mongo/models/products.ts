/* eslint-disable import/no-unresolved */
import mongoose, {Document, model, Schema}  from 'mongoose';
 
const productSchema: Schema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [{ type: String, required: true }], default: [] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
});

//const model: model = mongoose.model('Product', productSchema);

//module.exports = model;