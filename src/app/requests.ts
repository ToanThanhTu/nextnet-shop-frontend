export async function getCategories() {
  const response = await fetch("/api/categories");
  return response.json();
}

export async function getProducts(endpoint: string, query: URLSearchParams) {
  const response = await fetch(`/api/products/${endpoint}/?${query}`);
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

export async function getProductBySlug(slug: string) {
  const response = await fetch(`/api/products/slug/${slug}`);
  return response.json();
}

export async function getProductsRecommendations(productId: number) {
  const response = await fetch(`/api/products/recommendations/${productId}`);
  return response.json();
}