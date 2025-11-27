import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// Pre-save hook to auto-generate serial ID
productSchema.pre('save', async function (next) {
  // Only generate ID if it's not already set (for new documents)
  if (!this.id) {
    try {
      // Find the maximum id in the collection
      const maxProduct = await this.constructor
        .findOne()
        .sort({ id: -1 })
        .select('id')
        .lean();

      // Set the new id to max + 1, or 1 if no products exist
      this.id = maxProduct && maxProduct.id ? maxProduct.id + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

export default model('Product', productSchema, 'products');
