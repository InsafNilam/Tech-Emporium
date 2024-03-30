<script>
  export let product;
  const { images } = product;
</script>

<div class="relative block h-full rounded-3xl overflow-hidden card shadow-md">
  <!-- https://i.imgur.com/2DhmtJ4.jpg, https://i.imgur.com/oYiTqum.jpg -->
  <img
    src={images?.[0]}
    class="object-cover object-center h-64 w-full"
    alt=""
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = "https://i.imgur.com/oYiTqum.jpg";
    }}
  />
  <div
    class="absolute bottom-0 left-0 right-0 z-1 roundend-t-3xl translate-y-full transition-all duration-200 bg-white card__header"
  >
    <div
      class="relative flex items-center gap-2 p-2 rounded-tl-3xl -translate-y-full transition-all duration-200 bg-white"
    >
      <svg
        class="w-[80px] h-[80px] absolute bottom-full right-0 z-1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="#fff" d="M 40 80 c 27 0 40 -13 40 -40 v 40 Z" />
      </svg>
      <img
        class="w-[50px] h-[50px] shrink-0 rounded-3xl object-cover"
        src={product?.thumbnail}
        alt="Product"
      />
      <div class="flex items-center justify-between flex-1">
        <div class="flex-1">
          <h3 class="text-[#6A515E] text-sm">{product?.brand}</h3>
          <span class="text-[#D7BDCA] text-sm line-clamp-1"
            >{product?.title}</span
          >
        </div>
        <div class="flex flex-col py-1 space-y-1">
          <span
            class="text-xs font-semibold px-3 flex items-center line-through"
            >${product.price.toFixed(2)}</span
          >
          <span
            class=" text-orange-500 text-xs font-semibold px-3 flex items-center"
            >${(
              (product.price * (100 - product.discountPercentage)) /
              100
            ).toFixed(2)}</span
          >
        </div>
      </div>
    </div>
    <p class="m-0 px-4 pb-2 absolute top-0 text-sm text-[#D7BDCA] line-clamp-3">
      {product?.description}
    </p>
  </div>
</div>
