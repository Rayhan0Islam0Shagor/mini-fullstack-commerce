import express from 'express';
import { CategoryController } from './category.controller.js';

const router = express.Router();

// create category
router.post('/', CategoryController.createCategory);

// get all categories
router.get('/', CategoryController.getAllCategories);

// update category
router.put('/:id', CategoryController.updateCategory);

// delete category
router.delete('/:id', CategoryController.deleteCategory);

// export all the functions
export const CategoryRoutes = router;
