export async function getCategories() {
  const response = await fetch("/api/categories");
  return response.json();
}

export async function getProducts(endpoint: string, query: URLSearchParams) {
  const response = await fetch(`/api/products/${endpoint}/?${query}`);
  return response.json();
}

export async function getProductsByCategoryName(categoryName: string) {
  const response = await fetch(
    `/api/products/categories/${categoryName}`
  );
  return response.json();
}

export async function getProductsBySubCategoryName(subcategoryName: string) {
  const response = await fetch(
    `/api/products/subcategories/${subcategoryName}`
  );
  return response.json();
}

export async function getOnSaleProducts(query: URLSearchParams) {
  const response = await fetch(`/api/products/sales?${query}`);
  return response.json();
}

export async function getBestSellers(query: URLSearchParams) {
  const response = await fetch(`/api/products/bestsellers?${query}`);
  return response.json();
}


export async function getProductsBySearchText(query: URLSearchParams) {
  const response = await fetch(`/api/products/search?${query}`);
  return response.json();
}
