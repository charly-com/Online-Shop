const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
   Product.fetchAll((products) => {
       res.render('shop/product-list', {
           prods: products, 
           pageTitle: 'all products',
           path: '/products'
       });
   });
}

exports.getproduct = (req, res, next) => {
    const prodId = req.params.productId
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            product: product, 
            pageTitle: product.title,
            path: '/products'
        })
    })
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products, 
            pageTitle: 'shop',
            path: '/'
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'your cart',
        path: '/cart'
    })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
      Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
  };

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId
//   Product.findById(prodId, product => {
//     Cart.addProduct(prodId, product.price)
//   })
//   res.redirect('/cart')
// }

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'your Orders',
        path: '/orders'
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: "/checkout",
        pageTitle: "checkout"
    })
}