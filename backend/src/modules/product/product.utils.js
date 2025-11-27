export const transformProductData = (product) => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category.name,
    image: product.image,
    rating: product.rating,
    stock: product.stock,
  };
};
