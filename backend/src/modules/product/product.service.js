import mongoose from 'mongoose';
import productModel from './product.model.js';
import categoryModel from '../category/category.model.js';
import { transformProductData } from './product.utils.js';
import QueryBuilder from '../../utils/QueryBuilder.js';

// create product
const createProductIntoDB = async (productData) => {
  // Remove id from productData to ensure it's auto-generated
  const { id, ...dataWithoutId } = productData;
  const result = await productModel.create(dataWithoutId);
  return result;
};

// get all products
const getAllProductsFromDB = async (query) => {
  const queryBuilder = new QueryBuilder(productModel, query);

  // Build the query with search, filter, sort, pagination, fields, and populate
  queryBuilder.search(['title']).filter().sort().paginate().fields().populate({
    path: 'category',
    select: 'name -_id',
  });

  // Execute the query and get total count in parallel
  const [products, total] = await Promise.all([
    queryBuilder.modelQuery,
    queryBuilder.countTotal(),
  ]);

  const page = queryBuilder.page || 1;
  const limit = queryBuilder.limit || 10;
  const totalPages = Math.ceil(total / limit);

  return {
    data: products.map((product) => {
      return transformProductData(product);
    }),
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

// get product by id (supports both MongoDB ObjectId and serial ID)
const getProductByIdFromDB = async (productId) => {
  let result;

  // Check if productId is a valid MongoDB ObjectId
  if (mongoose.Types.ObjectId.isValid(productId)) {
    result = await productModel.findById(productId).populate({
      path: 'category',
      select: 'name -_id',
    });
  } else {
    // Try to find by serial ID (number)
    const serialId = parseInt(productId, 10);
    if (!isNaN(serialId)) {
      result = await productModel.findOne({ id: serialId }).populate({
        path: 'category',
        select: 'name -_id',
      });
    }
  }

  if (!result) {
    return null;
  }

  return transformProductData(result);
};

// get products by category
const getProductsByCategoryFromDB = async (categoryName) => {
  const category = await categoryModel.findOne({ name: categoryName });

  if (!category) {
    return null;
  }

  const result = await productModel
    .find({ category: category._id })
    .limit(5)
    .populate({
      path: 'category',
      select: 'name -_id',
    });

  if (!result || result.length === 0) {
    return [];
  }

  return result.map((product) => {
    return transformProductData(product);
  });
};

// update product (supports both MongoDB ObjectId and serial ID)
const updateProductInDB = async (productId, productData) => {
  // Remove id from productData to prevent changing the serial ID
  const { id, ...dataWithoutId } = productData;

  let result;

  // Check if productId is a valid MongoDB ObjectId
  if (mongoose.Types.ObjectId.isValid(productId)) {
    result = await productModel.findByIdAndUpdate(productId, dataWithoutId, {
      new: true,
    });
  } else {
    // Try to find by serial ID (number)
    const serialId = parseInt(productId, 10);
    if (!isNaN(serialId)) {
      result = await productModel.findOneAndUpdate(
        { id: serialId },
        dataWithoutId,
        { new: true },
      );
    }
  }

  return result;
};

// delete product (supports both MongoDB ObjectId and serial ID)
const deleteProductFromDB = async (productId) => {
  let result;

  // Check if productId is a valid MongoDB ObjectId
  if (mongoose.Types.ObjectId.isValid(productId)) {
    result = await productModel.findByIdAndDelete(productId);
  } else {
    // Try to find by serial ID (number)
    const serialId = parseInt(productId, 10);
    if (!isNaN(serialId)) {
      result = await productModel.findOneAndDelete({ id: serialId });
    }
  }

  return result;
};

// export all the functions
export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  getProductsByCategoryFromDB,
  updateProductInDB,
  deleteProductFromDB,
};
