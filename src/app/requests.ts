export async function getCategories() {
  const response = await fetch("http://localhost:3001/categories");
  return response.json();
}

export async function getProducts() {
  const response = await fetch("http://localhost:3001/products");
  return response.json();
}

export async function getProductsByCategoryName(categoryName: string) {
  const response = await fetch(
    `http://localhost:3001/products/categories/${categoryName}`
  );
  return response.json();
}

export async function getProductsBySubCategoryName(subcategoryName: string) {
  const response = await fetch(
    `http://localhost:3001/products/subcategories/${subcategoryName}`
  );
  return response.json();
}

export async function getOnSaleProducts() {
  const response = await fetch("http://localhost:3001/products/sales");
  return response.json();
}

export async function getBestSellers() {
  const response = await fetch("http://localhost:3001/products/bestsellers");
  return response.json();
}
