import express from 'express';
import { ProductValidation } from './product.validation.js';
import { ProductController } from './product.controller.js';
import validateRequest from '../../middlewares/validateRequest.js';

const router = express.Router();

// create product
router.post(
  '/create-product',
  validateRequest(ProductValidation.createProductValidation),
  ProductController.createProduct,
);

// get all products
router.get('/', ProductController.getAllProducts);

// get products by category
router.get('/category/:categoryName', ProductController.getProductsByCategory);

// get product by id
router.get('/:id', ProductController.getProductById);

// update product
router.put(
  '/:id',
  validateRequest(ProductValidation.updateProductValidation),
  ProductController.updateProduct,
);

// delete product
router.delete('/:id', ProductController.deleteProduct);

// export the router
export const ProductRoutes = router;
