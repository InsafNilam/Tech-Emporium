<script lang="ts">
  import Card from "./Card.svelte";
  import SectionWrapper from "./SectionWrapper.svelte";
  import { createSearchStore, searchHandler } from "../lib/stores/search";
  import { afterUpdate, onDestroy } from "svelte";

  import { Drawer } from "flowbite-svelte";
  import { sineIn } from "svelte/easing";
  let hidden1 = true;
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };

  /** @type {import('./$types').PageData} */
  export let products;

  type Product = {
    title: string;
    description: string;
    brand: string;
    category: string;
    searchTerms: string;
  };

  const searchProducts: Product[] = products.map((product: Product) => ({
    ...product,
    searchTerms: `${product.title} ${product.description} ${product.brand} ${product.category}`,
  }));

  let minPrice: number = 0;
  let maxPrice: number = 10000;

  const searchStore = createSearchStore(searchProducts);
  const unsubscribe = searchStore.subscribe((model) =>
    searchHandler(model, minPrice, maxPrice)
  );

  let rangeDivRef: null | HTMLElement = null;
  let priceDivRef: null | HTMLElement = null;
  let sliderDivRef: null | HTMLElement = null;

  function submitValue() {
    const priceInput = priceDivRef.querySelectorAll(
      ".field input"
    ) as NodeListOf<HTMLInputElement>;

    minPrice = parseInt(priceInput[0].value);
    maxPrice = parseInt(priceInput[1].value);

    searchStore.update((model) => {
      return model;
    });
  }

  function resetValue() {
    minPrice = 0;
    maxPrice = 10000;
  }

  afterUpdate(() => {
    // Do something with nd, such as adding event listeners, styles, etc.
    const rangeInput = rangeDivRef?.querySelectorAll(
      ".range-input input"
    ) as NodeListOf<HTMLInputElement>;
    const priceInput = priceDivRef?.querySelectorAll(
      ".field input"
    ) as NodeListOf<HTMLInputElement>;
    const range = sliderDivRef?.querySelector(".progress") as HTMLInputElement;
    let priceGap = 100;

    if (priceInput) {
      priceInput.forEach((input) => {
        input.addEventListener("input", (e) => {
          let minPrice = parseInt(priceInput[0].value);
          let maxPrice = parseInt(priceInput[1].value);

          // Ensure numeric values for comparison
          if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            if (
              maxPrice - minPrice >= priceGap &&
              maxPrice <= Number(rangeInput[1].max)
            ) {
              if (
                (e.target as HTMLInputElement).className.includes("input-min")
              ) {
                rangeInput[0].value = minPrice.toString();
                range.style.left =
                  (minPrice / Number(rangeInput[0].max)) * 100 + "%";
              } else {
                rangeInput[1].value = maxPrice.toString();
                range.style.right =
                  100 - (maxPrice / Number(rangeInput[1].max)) * 100 + "%";
              }
            }
          } else {
            console.warn("Invalid price input. Please enter numbers only."); // Handle non-numeric input
          }
        });
      });
    }

    if (rangeInput) {
      rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
          let minVal = parseInt(rangeInput[0].value);
          let maxVal = parseInt(rangeInput[1].value);

          if (maxVal - minVal < priceGap) {
            if (
              (e.target as HTMLInputElement).className.includes("range-min")
            ) {
              rangeInput[0].value = (maxVal - priceGap).toString();
            } else {
              rangeInput[1].value = (minVal + priceGap).toString();
            }
          } else {
            priceInput[0].value = minVal.toString();
            priceInput[1].value = maxVal.toString();
            range.style.left = (minVal / Number(rangeInput[0].max)) * 100 + "%";
            range.style.right =
              100 - (maxVal / Number(rangeInput[1].max)) * 100 + "%";
          }
        });
      });
    }
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<SectionWrapper id="product">
  <div class="flex justify-between items-center px-2 py-2 mt-4 mb-2 space-x-2">
    <div class="flex-1">
      <div
        class="bg-gray-600 items-center justify-between flex rounded-full shadow-lg p-2 sticky top-1"
      >
        <input
          class="border-none font-bold uppercase rounded-full w-full py-3 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
          type="search"
          placeholder="Search...."
          bind:value={$searchStore.search}
        />
        <div
          class="bg-white p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full text-gray-700 hover:text-white"
        >
          <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
    <div
      class="bg-gray-600 flex items-center justify-between rounded-full shadow-lg py-2 px-1 text-white h-[60px]"
    >
      <button
        on:click={() => (hidden1 = false)}
        class="w-[52px] grid place-items-center"
        ><svg
          class="w-7 h-7"
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g id="Filter">
              <rect
                id="Rectangle"
                fill-rule="nonzero"
                x="0"
                y="0"
                width="24"
                height="24"
              >
              </rect>
              <line
                x1="4"
                y1="5"
                x2="16"
                y2="5"
                id="Path"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
              >
              </line>
              <line
                x1="4"
                y1="12"
                x2="10"
                y2="12"
                id="Path"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
              >
              </line>
              <line
                x1="14"
                y1="12"
                x2="20"
                y2="12"
                id="Path"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
              >
              </line>
              <line
                x1="8"
                y1="19"
                x2="20"
                y2="19"
                id="Path"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
              >
              </line>
              <circle
                id="Oval"
                stroke="#c2b97f"
                stroke-width="2"
                stroke-linecap="round"
                cx="18"
                cy="5"
                r="2"
              >
              </circle>
              <circle
                id="Oval"
                stroke="#c2b97f"
                stroke-width="2"
                stroke-linecap="round"
                cx="12"
                cy="12"
                r="2"
              >
              </circle>
              <circle
                id="Oval"
                stroke="#c2b97f"
                stroke-width="2"
                stroke-linecap="round"
                cx="6"
                cy="19"
                r="2"
              >
              </circle>
            </g>
          </g>
        </svg></button
      >
    </div>
  </div>
  <div class="grid grid-cols-auto-fit-300 gap-4 m-4 p-0">
    {#each $searchStore.filtered as product}
      <Card {product} />
    {/each}
  </div>
  <Drawer
    transitionType="fly"
    {transitionParams}
    bind:hidden={hidden1}
    id="sidebar1"
  >
    <div class="">
      <h5
        class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Price
      </h5>
      <div class="price-input" bind:this={priceDivRef}>
        <div class="field">
          <span>Min</span>
          <input type="number" class="input-min" bind:value={minPrice} />
        </div>
        <div class="separator">-</div>
        <div class="field">
          <span>Max</span>
          <input type="number" class="input-max" bind:value={maxPrice} />
        </div>
      </div>
      <div class="slider" bind:this={sliderDivRef}>
        <div class="progress"></div>
      </div>
      <div class="range-input" bind:this={rangeDivRef}>
        <input
          type="range"
          class="range-min"
          min="0"
          max="10000"
          bind:value={minPrice}
          step="100"
        />
        <input
          type="range"
          class="range-max"
          min="0"
          max="10000"
          bind:value={maxPrice}
          step="100"
        />
      </div>
      <div class="w-full flex justify-end items-center my-4">
        <button
          type="button"
          on:click={resetValue}
          class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >Reset</button
        >
        <button
          type="button"
          on:click={submitValue}
          class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >Submit</button
        >
      </div>
    </div>
  </Drawer>
</SectionWrapper>

<style>
  ::selection {
    color: #fff;
    background: #17a2b8;
  }
  .price-input {
    width: 100%;
    display: flex;
    margin: 30px 0 35px;
  }
  .price-input .field {
    display: flex;
    width: 100%;
    height: 45px;
    align-items: center;
  }
  .field input {
    width: 100%;
    height: 100%;
    outline: none;
    font-size: 19px;
    margin-left: 12px;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #999;
    appearance: textfield;
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .price-input .separator {
    width: 80px;
    display: flex;
    font-size: 19px;
    align-items: center;
    justify-content: center;
  }
  .slider {
    height: 5px;
    position: relative;
    background: #ddd;
    border-radius: 5px;
  }
  .slider .progress {
    height: 100%;
    left: 25%;
    right: 25%;
    position: absolute;
    border-radius: 5px;
    background: #17a2b8;
  }
  .range-input {
    position: relative;
  }
  .range-input input {
    position: absolute;
    width: 100%;
    height: 5px;
    top: -5px;
    background: none;
    pointer-events: none;
    appearance: none;
  }
  input[type="range"]::-webkit-slider-thumb {
    height: 17px;
    width: 17px;
    border-radius: 50%;
    background: #17a2b8;
    pointer-events: auto;
    -webkit-appearance: none;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
  }
  input[type="range"]::-moz-range-thumb {
    height: 17px;
    width: 17px;
    border: none;
    border-radius: 50%;
    background: #17a2b8;
    pointer-events: auto;
    -moz-appearance: none;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
  }
</style>
