import { writable } from "svelte/store";

export interface SearchStoreModel<T extends Record<PropertyKey, any>> {
  data: T[];
  filtered: T[];
  search: "";
}
export const createSearchStore = <T extends Record<PropertyKey, any>>(
  data: T[]
) => {
  const { subscribe, set, update } = writable<SearchStoreModel<T>>({
    data,
    filtered: data,
    search: "",
  });
  return { subscribe, set, update };
};

export const searchHandler = <T extends Record<PropertyKey, any>>(
  store: SearchStoreModel<T>,
  minPrice?: number,
  maxPrice?: number
) => {
  const searchTerm = store.search.toLowerCase() || "";
  store.filtered = store.data.filter((item) => {
    // Include price filter only if both minPrice and maxPrice are defined
    const priceFilter =
      minPrice !== undefined && maxPrice !== undefined
        ? item.price >= minPrice && item.price <= maxPrice
        : true; // Include all items if price filter not defined
    return item.searchTerms.toLowerCase().includes(searchTerm) && priceFilter;
  });
};

export const filterProducts = <T extends Record<PropertyKey, any>>(
  store: SearchStoreModel<T>,
  minPrice: number,
  maxPrice: number
) => {
  store.filtered = store.data.filter(
    (item) => item.price >= minPrice && item.price <= maxPrice
  );
};
