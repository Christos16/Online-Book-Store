const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      maxLength: 400
    },
    description: {
      type: String
    },
    author: {
      type: String
    },
    dimensions: {
      type: String
    },
    year: {
      type: String
    },
    pagenumber: {
      type: String
    },
    isbn: {
      type: String
    },
    price: {
      type: Number,
      default: 0
    },
    publisher: {
      type: String
    },
    images: {
      type: Array,
      default: []
    },
    quantity: {
      type: Number,
      default: 0
    },
    continents: {
      type: Number,
      default: 1
    },
    sold: {
      type: Number,
      maxLength: 100,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

productSchema.index(
  {
    title: 'text',
    description: 'text'
  },
  {
    weights: {
      title: 10,
      description: 1
    }
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
