import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { categoryServices } from './category.service.js';

// create category
const createCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category is created successfully',
    data: result,
  });
});

// get all categories
const getAllCategories = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoriesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched successfully',
    data: result,
  });
});

// update category
const updateCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.updateCategoryInDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is updated successfully',
    data: result,
  });
});

// delete category
const deleteCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.deleteCategoryFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is deleted successfully',
    data: result,
  });
});

// export all the functions
export const CategoryController = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
