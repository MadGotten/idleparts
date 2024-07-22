import { Link } from 'react-router-dom';

const Pagination = ({ currentPage, totalPages }) => {
  const pages = Array.from(Array(totalPages).keys());
  const nextPage = currentPage + 1 < totalPages ? currentPage + 1 : currentPage;
  const prevPage = currentPage - 1 >= 0 ? currentPage - 1 : currentPage;

  return (
    <>
      <nav>
        <ul className="flex items-center -space-x-px h-8 text-sm text-white">
          <li>
            <Link
              to={{
                pathname: window.location.pathname,
                search: `page=${encodeURIComponent(prevPage)}`,
              }}
              className="flex items-center justify-center cursor-pointer px-3 h-8 ms-0 leading-tight rounded-l-lg border-0 border-r border-blue-900 bg-blue-600 hover:bg-blue-800"
            >
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </Link>
          </li>
          {pages.map((pageNumber) => (
            <li key={pageNumber}>
              {currentPage === pageNumber ? (
                <Link
                  to={{
                    pathname: window.location.pathname,
                    search: `page=${encodeURIComponent(pageNumber)}`,
                  }}
                  className="flex items-center justify-center cursor-pointer px-3 h-8 leading-tight border-0 border-x border-blue-900 bg-blue-800"
                >
                  {pageNumber}
                </Link>
              ) : (
                <Link
                  to={{
                    pathname: window.location.pathname,
                    search: `page=${encodeURIComponent(pageNumber)}`,
                  }}
                  className="flex items-center justify-center cursor-pointer px-3 h-8 leading-tight border-0 border-x border-blue-900 bg-blue-600 hover:bg-blue-800"
                >
                  {pageNumber}
                </Link>
              )}
            </li>
          ))}
          <li>
            <Link
              to={{
                pathname: window.location.pathname,
                search: `page=${encodeURIComponent(nextPage)}`,
              }}
              className="flex items-center justify-center cursor-pointer px-3 h-8 leading-tight rounded-r-lg border-0 border-l border-blue-900 bg-blue-600 hover:bg-blue-800"
            >
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
