<script>
  export let categories;

  let navbarRef = null;
  function handleScroll(event) {
    scrollPosition = event.target.scrollLeft;
  }

  function scrollLeft() {
    navbarRef.scrollBy({
      left: -150,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    navbarRef.scrollBy({
      left: 150,
      behavior: "smooth",
    });
  }
</script>

<div class="bg-[#455a64] overflow-hidden py-2">
  <div class="max-w-7xl flex items-center justify-center mx-auto">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="flex items-center justify-center bg-black/50 text-white cursor-pointer z-10 transition-all hover:opacity-70 h-8 w-8 rounded-full mr-2"
      on:click={scrollLeft}
    >
      <i class="fa-solid fa-chevron-left flex items-center justify-center"></i>
    </div>
    <div
      class="flex overflow-x-auto overflow-y-hidden whitespace-nowrap space-x-2 flex-1 navbar"
      on:scroll={handleScroll}
      bind:this={navbarRef}
    >
      <div class="p-2 block text-white/80 uppercase text-xs cursor-pointer">
        All
      </div>
      {#each categories as category}
        <div class="p-2 block text-white/80 uppercase text-xs cursor-pointer">
          {category}
        </div>
      {/each}
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="flex items-center justify-center bg-black/50 text-white cursor-pointer z-10 transition-all hover:opacity-70 h-8 w-8 rounded-full ml-2"
      on:click={scrollRight}
    >
      <i class="fa-solid fa-chevron-right flex items-center justify-center" />
    </div>
  </div>
</div>

<style>
  .navbar {
    scrollbar-width: none; /* Hide scrollbar in Firefox */
    -ms-overflow-style: none; /* Hide scrollbar in IE and Edge */
  }

  .navbar::-webkit-scrollbar {
    display: none; /* Hide scrollbar in WebKit browsers */
  }
</style>
