import React, { useState, useCallback } from "react";
import Image from "next/image";

const Categorie = ({ categorie }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const handleOutsideClick = useCallback((e) => {
    if (e.target.classList.contains("popup-overlay")) {
      closePopup();
    }
  }, []);

  const initialWidthImg = 720;
  const initialHeightImg = 900;
  const popupWidthImgS = (initialWidthImg * 40) / 100;
  const popupHeightImgS = (initialHeightImg * 40) / 100;
  const popupWidthImg = (initialWidthImg * 60) / 100;
  const popupHeightImg = (initialHeightImg * 60) / 100;

  const initialWidth = 360;
  const initialHeight = 640;
  const popupWidth = (initialWidth * 80) / 100;
  const popupHeight = (initialHeight * 80) / 100;
  const popupWidthS = (initialWidth * 70) / 100;
  const popupHeightS = (initialHeight * 70) / 100;

  return (
    <div className="border border-[#d4d6d8] max-w-[224px] max-h-[277.73px] sm:min-h-[249.83px] flex items-center justify-center relative">
      <div className="py-1 sm:py-2 px-1 sm:px-2" key={categorie._id}>
        <div onClick={openPopup}>
          {categorie.category === "video" ? (
            <div className="relative size-full cursor-pointer hover:scale-120 transition-transform duration-500 ease-in-out rounded-sm">
              <video
                controls
                className="size-full max-w-[186px] max-h-[232px] object-cover rounded-lg"
              >
                <source src={categorie.url} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-sm">
                <span className="text-white text-3xl">▶</span>
              </div>
            </div>
          ) : (
            <Image
              src={categorie.url}
              className="size-full hover:scale-120 transition-transform duration-500 ease-in-out max-w-[206.67px] max-h-[232.5px] rounded-sm"
              alt={categorie.title}
              width={206.67}
              height={232.5}
            />
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 popup-overlay bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="relative bg-black p-4 rounded-lg">
            <button
              className="absolute top-2 right-2 text-white font-bold text-xl bg-gray-800 p-1 rounded-full z-50"
              onClick={closePopup}
            >
              ×
            </button>
            {categorie.category === "video" ? (
              <>
                <video
                  controls
                  className="w-full h-full object-cover rounded-lg hidden sm:flex"
                  style={{
                    width: `${popupWidth}px`,
                    height: `${popupHeight}px`,
                  }}
                >
                  <source src={categorie.url} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
                <video
                  controls
                  className="w-full h-full object-cover rounded-lg flex sm:hidden"
                  style={{
                    width: `${popupWidthS}px`,
                    height: `${popupHeightS}px`,
                  }}
                  // poster={categorie.url} // Assurez-vous que l'URL du poster est correcte
                >
                  <source src={categorie.url} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </>
            ) : (
              <>
                <Image
                  src={categorie.url}
                  className="w-full h-full object-cover rounded-lg hidden sm:flex"
                  style={{
                    width: `${popupWidthImg}px`,
                    height: `${popupHeightImg}px`,
                  }}
                  alt={categorie.title}
                  width={popupWidthImg}
                  height={popupHeightImg}
                />
                <Image
                  src={categorie.url}
                  className="w-full h-full object-cover rounded-lg flex sm:hidden"
                  style={{
                    width: `${popupWidthImgS}px`,
                    height: `${popupHeightImgS}px`,
                  }}
                  alt={categorie.title}
                  width={popupWidthImg}
                  height={popupHeightImg}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorie;
