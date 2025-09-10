import { useEffect } from "react";
import { PaginationNext, PaginationPrev } from "@/svg";

const Pagination = ({
  items = [],
  countOfPage = 12,
  paginatedData,
  currPage,
  setCurrPage,
}) => {
  const pageStart = (currPage - 1) * countOfPage;
  const totalPage = Math.ceil(items.length / countOfPage);

  function setPage(idx) {
    if (idx <= 0 || idx > totalPage) {
      return;
    }
    setCurrPage(idx);
    window.scrollTo(0, 0);
    // Note: You might not need to call paginatedData here since the useEffect will handle it when currPage changes.
    // However, leaving it can make the pagination feel slightly more responsive.
    paginatedData(items, pageStart, countOfPage);
  }

  // The correction is in the array on the next line
  useEffect(() => {
    paginatedData(items, pageStart, countOfPage);
  }, [items, pageStart, countOfPage, paginatedData]);

  return (
    <nav>
      {totalPage > 1 && (
        <ul>
          <li>
            <button
              onClick={() => setPage(currPage - 1)}
              className={`tp-pagination-prev prev page-numbers ${
                currPage === 1 && "disabled"
              }`}
            >
              <PaginationPrev />
            </button>
          </li>

          {Array.from({ length: totalPage }, (_, i) => i + 1).map((n) => (
            <li key={n} onClick={() => setPage(n)}>
              <span className={`${currPage === n ? "current" : ""}`}>{n}</span>
            </li>
          ))}

          <li>
            <button
              onClick={() => setPage(currPage + 1)}
              className={`next page-numbers ${
                currPage === totalPage ? "disabled" : ""
              }`}
            >
              <PaginationNext />
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Pagination;