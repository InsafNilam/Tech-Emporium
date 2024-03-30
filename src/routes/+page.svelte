<script>
  import Categories from "../components/Categories.svelte";

  // import Footer from "../components/Footer.svelte";
  import Hero from "../components/Hero.svelte";
  import Pagination from "../components/Pagination.svelte";
  import Product from "../components/Product.svelte";
  import Reviews from "../components/Reviews.svelte";
  // import SectionWrapper from "../components/SectionWrapper.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
  const { products, total } = data.products;
  const categories = data.categories;
</script>

<main class="flex flex-col">
  <!-- <Hero /> -->
  <!-- <Reviews /> -->
  <Categories {categories} />
  <Product {products} />
  <Pagination {total} />
  <!-- <Footer /> -->
</main>
