function Pagination(props) {
  const { articlesCount, articlePerPage, activePageIndex, changeIndex } = props;

  const numberOfPage = Math.ceil(articlesCount / articlePerPage);
  const pagesArray = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pagesArray.push(i);
  }
  if (!articlesCount) {
    return "";
  }

  console.log("numberOfPage", numberOfPage);

  return (
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div class="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">
              {" "}
              {activePageIndex === 1 ? 1 : activePageIndex * 10 - 10}
            </span>
            to
            <span class="font-medium">{activePageIndex * 10}</span>
            of
            <span class="font-medium">{articlesCount}</span>
            results
          </p>
        </div>
        <div>
          <nav
            class="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <span
              class="relative inline-flex items-center rounded-l-md border border-gray-300 border-solid bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              onClick={() => {
                changeIndex(activePageIndex - 1);
              }}
            >
              <span class="sr-only">Previous</span>

              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            {numberOfPage - activePageIndex <= 7 ? (
              [...pagesArray]
                .slice(pagesArray.length - 7, pagesArray.length)
                .map((e, i) => {
                  return (
                    <span
                      aria-current="page"
                      class="relative z-10 inline-flex items-center border border-indigo-500 border-solid px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                      onClick={() => {
                        changeIndex(e);
                      }}
                    >
                      {e}
                    </span>
                  );
                })
            ) : numberOfPage - activePageIndex > 7 ? (
              <>
                {[...pagesArray]
                  .slice(activePageIndex - 1, activePageIndex + 2)
                  .map((e, i) => {
                    return (
                      <span
                        aria-current="page"
                        class="relative z-10 inline-flex items-center border border-zinc-300 border-solid  px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                        onClick={() => {
                          changeIndex(e);
                        }}
                        // bg-indigo-50
                      >
                        {e}
                      </span>
                    );
                  })}
                <span class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                  ...
                </span>
                {[...pagesArray]
                  .slice(pagesArray.length - 3, pagesArray.length)
                  .map((e, i) => {
                    return (
                      <span
                        aria-current="page"
                        class="relative z-10 inline-flex items-center border border-zinc-300 border-solid  px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                        onClick={() => {
                          changeIndex(e);
                        }}
                      >
                        {e}
                      </span>
                    );
                  })}
              </>
            ) : (
              ""
            )}
            <span
              href="#"
              class="relative inline-flex items-center rounded-r-md border border-solid border-zinc-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span class="sr-only">Next</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
