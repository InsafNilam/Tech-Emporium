<script>
  export let total;
  import { page } from "$app/stores";
  let pageSize = 10;
  $: totalPages = Math.ceil(total / pageSize);
  $: currentPage = (Number($page.url.searchParams.get("skip")) || 0) / pageSize;
</script>

<div class="flex items-center justify-center w-full py-2">
  <ul class="flex items-center -space-x-px h-8 text-sm">
    <li>
      <a
        href="/?limit={pageSize}&skip={pageSize * --currentPage}"
        class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <span class="sr-only">Previous</span>
        <svg
          class="w-2.5 h-2.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </a>
    </li>
    {#each Array(totalPages) as _, idx}
      <li>
        <a
          data-sveltekit-reload
          href="/?limit={pageSize}&skip={pageSize * idx}"
          class={"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white " +
            (currentPage === idx ? "text-emerald-500" : "")}>{idx + 1}</a
        >
      </li>
    {/each}
    <li>
      <a
        href="/?limit={pageSize}&skip={pageSize * ++currentPage}"
        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <span class="sr-only">Next</span>
        <svg
          class="w-2.5 h-2.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </a>
    </li>
  </ul>
</div>
