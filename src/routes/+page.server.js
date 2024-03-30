import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, setHeaders }) {
  const limit = Number(url.searchParams.get("limit")) || 10;
  const skip = Number(url.searchParams.get("skip")) || 0;

  const getProducts = async (limit = 10, skip = 0) => {
    if (limit > 100) {
      throw error(400, "Bad Request");
    }

    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
      {
        method: "GET",
      }
    );
    const cacheControl = response.headers.get("cache-control");
    console.log(cacheControl);
    if (cacheControl) {
      setHeaders({
        // age: response.headers.get("age"),
        "cache-control": cacheControl,
      });
    }
    const data = await response.json();
    return data;
  };

  const getCategories = async () => {
    const response = await fetch(`https://dummyjson.com/products/categories`, {
      method: "GET",
    });
    const cacheControl = response.headers.get("cache-control");
    if (cacheControl) {
      setHeaders({
        // age: response.headers.get("age"),
        "cache-control": cacheControl,
      });
    }
    const data = await response.json();
    return data;
  };

  let products = await getProducts(limit, skip);
  let categories = await getCategories();
  return {
    products,
    categories,
  };
}
