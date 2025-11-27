import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { productServices } from './product.service.js';

const createProduct = catchAsync(async (req, res) => {
  const result = await productServices.createProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product is created successfully',
    data: result,
  });
});

// get all products
const getAllProducts = catchAsync(async (req, res) => {
  const result = await productServices.getAllProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

// get product by id
const getProductById = catchAsync(async (req, res) => {
  const result = await productServices.getProductByIdFromDB(req.params.id);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Product not found',
      data: null,
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched successfully',
    data: result,
  });
});

// get products by category
const getProductsByCategory = catchAsync(async (req, res) => {
  const result = await productServices.getProductsByCategoryFromDB(
    req.params.categoryName,
  );

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Category not found',
      data: null,
    });
    return;
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Products fetched successfully',
      data: result,
    });
  }
});

// update product
const updateProduct = catchAsync(async (req, res) => {
  const result = await productServices.updateProductInDB(
    req.params.id,
    req.body,
  );

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Product not found',
      data: null,
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

// delete product
const deleteProduct = catchAsync(async (req, res) => {
  const result = await productServices.deleteProductFromDB(req.params.id);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Product not found',
      data: null,
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});

// export all the functions
export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
};
