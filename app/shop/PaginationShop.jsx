import { useRouter } from "next/navigation";

const PaginationShop = ({ pages, page, setPage }) => {
  const router = useRouter();

  const handlePageChange = (newPage) => {
    router.push(`/shop?pageNumber=${newPage}`);
    setPage(newPage);
  };

  const isFirstPage = page === 1;
  const isLastPage = page === pages;

  return (
    pages > 1 && (
      <nav className="flex justify-center">
        <ul className="flex items-center py-6 sm:py-8">
          {/* Bouton Précédent */}
          <li
            className={`cursor-pointer w-20 sm:w-24 h-6 sm:h-8 flex justify-center items-center border-primary border-[1px] ${
              isFirstPage
                ? "bg-[#e5e7eb] text-[#6b7280] cursor-not-allowed"
                : "bg-onPrimary hover:bg-primary"
            }`}
          >
            <button
              disabled={isFirstPage}
              className={`w-full h-full flex items-center justify-center ${
                isFirstPage ? "cursor-not-allowed" : "hover:text-white"
              }`}
              onClick={() => !isFirstPage && handlePageChange(page - 1)}
            >
              <div className="text-sm sm:text-base">Précédent</div>
            </button>
          </li>

          {/* Numéros de Page */}
          {[...Array(pages).keys()].map((x) => (
            <li
              key={x + 1}
              className={`bg-onPrimary hover:bg-primary border-primary border-[1px] font-serif font-semibold hover:text-white cursor-pointer w-10 sm:w-12 h-6 sm:h-8 flex justify-center items-center ${
                x + 1 === page ? "bg-primary text-white" : ""
              }`}
            >
              <button
                onClick={() => handlePageChange(x + 1)}
                className="w-full h-full flex items-center justify-center hover:text-white"
              >
                {x + 1}
              </button>
            </li>
          ))}

          {/* Bouton Suivant */}
          <li
            className={`cursor-pointer w-20 sm:w-24 h-6 sm:h-8 flex justify-center items-center border-primary border-[1px] ${
              isLastPage
                ? "bg-[#e5e7eb] text-[#6b7280] cursor-not-allowed"
                : "bg-onPrimary hover:bg-primary"
            }`}
          >
            <button
              disabled={isLastPage}
              className={`w-full h-full flex items-center justify-center ${
                isLastPage ? "cursor-not-allowed" : "hover:text-white"
              }`}
              onClick={() => !isLastPage && handlePageChange(page + 1)}
            >
              <div className="text-sm sm:text-base">Suivant</div>
            </button>
          </li>
        </ul>
      </nav>
    )
  );
};

export default PaginationShop;
