const express = require('express');
const router = express.Router();
const { Product, User } = require('../models/Product');
const multer = require('multer');

const { auth } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png') {
      return cb(res.status(400).end('only jpg, png are allowed'), false);
    }
    cd(null, true);
  }
});

const upload = multer({ storage: storage }).single('file');
//=================================
//             Product
//=================================

router.post('/uploadImage', auth, (req, res) => {
  // Multer library
  upload(req, res, err => {
    if (err) return res.json({ success: false, err });
    return res.json({
      success: true,
      image: res.req.file.path,
      filename: res.req.file.filename
    });
  });
});

router.post('/uploadProduct', auth, (req, res) => {
  const product = new Product(req.body);

  console.log(req.body);

  product.save(err => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/getProducts', (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};
  let term = req.body.searchTerm;

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate('writer')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  } else {
    Product.find(findArgs)
      .populate('writer')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  }
});

router.get('/products_by_id', (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;
  console.log(type);
  console.log(productIds);

  if (type === 'array') {
    let ids = req.query.id.split(',');
    productIds = [];
    productIds = ids.map(item => {
      return item;
    });
  }

  //We need to find the product information that belong to productId
  Product.find({ _id: { $in: productIds } })
    .populate('writer')
    .exec((err, product) => {
      if (err) return req.status(400).send(err);
      return res.status(200).send(product);
    });
});

router.get('/product_quantity', (req, res) => {
  let type = req.query.type;
  console.log(type);

  if (type === 'increase') {
    User.findOneAndUpdate(
      { _id: req.user._id, 'cart.id': req.query.id },
      { $inc: { 'card.$.quantity': +1 } },

      { new: true },
      () => {
        if (err) return res.json({ success: false, err });
        res.status(200).json('Success');
      }
    );
  } else if (type === 'decrease') {
    User.findOneAndUpdate(
      { _id: req.user._id, 'cart.id': req.query.productId },
      { $inc: { 'card.$.quantity': -1 } },

      { new: true },
      () => {
        if (err) return res.json({ success: false, err });
        res.status(200).json('Success');
      }
    );
  }
});

module.exports = router;
