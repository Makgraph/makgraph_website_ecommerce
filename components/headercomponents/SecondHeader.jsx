import { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import { useSearch } from "@components/context/SearchContext";

const SecondHeader = () => {
  const [inputValue, setInputValue] = useState(""); // Local state for the input
  const { setKeyword, fetchAllItems } = useSearch(); // Access the context

  // Update the keyword or fetch all items based on input
  useEffect(() => {
    if (inputValue.trim() === "") {
      fetchAllItems(); // Fetch all items if the input is cleared
    } else {
      setKeyword(inputValue); // Set the search keyword as the user types
    }
  }, [inputValue, setKeyword, fetchAllItems]);

  return (
    <div className="hidden sm:flex justify-center py-4  sm:w-[70%] md:w-full ">
      <form className="flex w-full mx-10 items-center">
        <div className="relative flex-1">
          {/* Icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IonIcon icon={searchOutline} className="text-[#4b5563]" />
          </div>
          {/* Input Field */}
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-[#e5e7eb] w-full text-sm sm:text-base text-[#1f2937] rounded-sm py-1 pl-10 md:pr-4 outline-none border border-[#d1d5db] focus:border-[#9ca3af] focus:bg-white focus:ring-2 focus:ring-[#d1d5db] focus:ring-opacity-50"
            onChange={(e) => setInputValue(e.target.value)} // Update the input state
            value={inputValue}
            aria-label="Rechercher"
          />
        </div>
      </form>
    </div>
  );
};

export default SecondHeader;


// import { useState, useEffect } from "react";
// import { IonIcon } from "@ionic/react";
// import { searchOutline } from "ionicons/icons";
// import { useSearch } from "@components/context/SearchContext";

// // Helper function to debounce the input
// const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     // Cleanup function
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// };

// const SecondHeader = () => {
//   const { setKeyword, setPageNumber } = useSearch();
//   const [inputValue, setInputValue] = useState(""); // Local state for input value

//   // Debounce input value, triggering after the user stops typing for 300ms
//   const debouncedKeyword = useDebounce(inputValue, 300);

//   useEffect(() => {
//     // When the debounced value changes, trigger search
//     if (debouncedKeyword.trim()) {
//       setKeyword(debouncedKeyword); // Update the keyword in context
//       setPageNumber(1); // Reset to the first page for new search
//     }
//   }, [debouncedKeyword, setKeyword, setPageNumber]);

//   return (
//     <div className="hidden sm:flex justify-center py-4 sm:w-[70%] md:w-full">
//       {/* Search Bar */}
//       <form
//         className="flex w-full mx-10 items-center"
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <div className="relative flex-1">
//           {/* Icon */}
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <IonIcon icon={searchOutline} className="text-[#4b5563]" />
//           </div>
//           {/* Input Field */}
//           <input
//             type="text"
//             placeholder="Rechercher..."
//             className="bg-[#e5e7eb] w-full text-sm sm:text-base text-[#1f2937] rounded-sm py-1 pl-10 md:pr-4 outline-none border border-[#d1d5db] focus:border-[#9ca3af] focus:bg-white focus:ring-2 focus:ring-[#d1d5db] focus:ring-opacity-50"
//             onChange={(e) => setInputValue(e.target.value)} // Update local input value
//             value={inputValue}
//             aria-label="Rechercher"
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SecondHeader;

// import { useState } from "react";
// import { IonIcon } from "@ionic/react";
// import { searchOutline } from "ionicons/icons";
// import { useSearch } from "@components/context/SearchContext";

// const SecondHeader = () => {
//   const { keyword, setKeyword, setPageNumber } = useSearch(); // Use search context
//   const [inputValue, setInputValue] = useState(keyword || ""); // Local state for input value

//   const submitHandler = (e) => {
//     e.preventDefault();

//     // Trim the keyword to avoid unnecessary spaces
//     const trimmedKeyword = inputValue.trim();

//     if (trimmedKeyword) {
//       // Update keyword in the context
//       setKeyword(trimmedKeyword);
//       // Reset to the first page when a new search is made
//       setPageNumber(1);
//     }
//   };

//   return (
//     <div className="hidden sm:flex justify-center py-4 sm:w-[70%] md:w-full">
//       {/* Search Bar */}
//       <form onSubmit={submitHandler} className="flex w-full mx-10 items-center">
//         <div className="relative flex-1">
//           {/* Icon */}
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <IonIcon icon={searchOutline} className="text-[#4b5563]" />
//           </div>
//           {/* Input Field */}
//           <input
//             type="text"
//             placeholder="Rechercher..."
//             className="bg-[#e5e7eb] w-full text-sm sm:text-base text-[#1f2937] rounded-sm py-1 pl-10 md:pr-4 outline-none border border-[#d1d5db] focus:border-[#9ca3af] focus:bg-white focus:ring-2 focus:ring-[#d1d5db] focus:ring-opacity-50"
//             onChange={(e) => setInputValue(e.target.value)} // Update local input value
//             value={inputValue}
//             aria-label="Rechercher"
//           />
//         </div>
//         {/* Styled Search Button */}
//         <button
//           type="submit"
//           className="ml-0 px-4 py-1 bg-primary text-white font-semibold rounded-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-[#d1d5db] focus:ring-opacity-50"
//         >
//           Search
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SecondHeader;

// // import { useState } from "react";
// import { IonIcon } from "@ionic/react";
// import { searchOutline, chevronDownOutline } from "ionicons/icons";
// // import { useNavigate } from "react-router-dom";

// // const SecondHeader = ({ keyword, setKeyword, pageNumber, setPageNumber }) => {
// const SecondHeader = () => {
//   // const navigate = useNavigate();

//   // const submitHandler = (e) => {
//   //   e.preventDefault();

//   //   // Trim le mot-clé pour éviter les espaces inutiles
//   //   const trimmedKeyword = keyword.trim();

//   //   // Vérifie si le mot-clé n'est pas vide
//   //   if (trimmedKeyword) {
//   //     // Si pageNumber est défini et valide, l'ajoute à l'URL
//   //     if (pageNumber && !isNaN(pageNumber)) {
//   //       navigate(
//   //         `/shop/search/${encodeURIComponent(
//   //           trimmedKeyword
//   //         )}/page/${pageNumber}`
//   //       );
//   //     } else {
//   //       navigate(`/shop/search/${encodeURIComponent(trimmedKeyword)}`);
//   //     }
//   //   }
//   // };

//   return (
//     <div className="hidden sm:flex justify-center py-4  sm:w-[70%] md:w-full ">
//       {/* Search Bar */}
//       {/* <form onSubmit={submitHandler} className="flex w-full mx-10 items-center"> */}
//       <form className="flex w-full mx-10 items-center">
//         <div className="relative flex-1">
//           {/* Icon */}
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <IonIcon icon={searchOutline} className="text-[#4b5563]" />
//           </div>
//           {/* Input Field */}
//           <input
//             type="text"
//             placeholder="Rechercher..."
//             className="bg-[#e5e7eb] w-full text-sm sm:text-base text-[#1f2937] rounded-sm py-1 pl-10 md:pr-4 outline-none border border-[#d1d5db] focus:border-[#9ca3af] focus:bg-white focus:ring-2 focus:ring-[#d1d5db] focus:ring-opacity-50"
//             // onChange={(e) => setKeyword(e.target.value)}
//             // value={keyword}
//             aria-label="Rechercher"
//           />
//         </div>
//         {/* Styled Search Button */}
//         <button
//           type="submit"
//           className="ml-0 px-4 py-1 bg-primary text-white font-semibold rounded-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-[#d1d5db] focus:ring-opacity-50"
//         >
//           Search
//         </button>
//       </form>
//       {/* </form> */}
//     </div>
//   );
// };

// export default SecondHeader;
