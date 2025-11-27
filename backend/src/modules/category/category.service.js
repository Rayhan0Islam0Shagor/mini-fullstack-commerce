import categoryModel from './category.model.js';

// create category
const createCategoryIntoDB = async (categoryData) => {
  const result = await categoryModel.create(categoryData);
  return result;
};

// get all categories
const getAllCategoriesFromDB = async () => {
  const result = await categoryModel.find();
  return result;
};

// update category
const updateCategoryInDB = async (categoryId, categoryData) => {
  const result = await categoryModel.findByIdAndUpdate(
    categoryId,
    categoryData,
    { new: true },
  );
  return result;
};

// delete category
const deleteCategoryFromDB = async (categoryId) => {
  const result = await categoryModel.findByIdAndDelete(categoryId);
  return result;
};

// export all the functions
export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  updateCategoryInDB,
  deleteCategoryFromDB,
};
