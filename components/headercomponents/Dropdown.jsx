"use client";

import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import { UserCircle } from "phosphor-react";
import Link from "next/link";

const Dropdown = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Référence au dropdown

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Écoute les clics globaux pour fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Ajoute l'événement au document lors de l'ouverture du dropdown
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // Nettoie l'événement lors du démontage du composant
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="md:bg-[#d3e2f7] text-[#374151] font-semibold md:py-[5.5px] px-2 rounded-1 inline-flex items-center"
      >
        {session && (
          <div className="md:flex hidden">
            <h5 className="text-primary flex font-serif text-[14px] font-normal">
              <div className="pr-1">Hi,</div>
              <div> {session.user.name}</div>
            </h5>
          </div>
        )}

        <div className="md:hidden">
          <UserCircle size={24} />
        </div>

        <svg
          className="fill-current h-4 w-4 text-primary md:ml-2 "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12.59l-6.3-6.3a1 1 0 1 0-1.4 1.42l7 7a1 1 0 0 0 1.4 0l7-7a1 1 0 0 0-1.4-1.42L10 12.59z" />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute mt-1 w-24 md:w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <li>
            <Link
              href="/profile"
              className="block py-2 px-4 font-serif text-xs md:text-sm text-[#374151] hover:bg-primary hover:text-onPrimary"
            >
              Profil
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 font-serif text-xs md:text-sm text-[#374151] hover:bg-primary hover:text-onPrimary"
              onClick={signOut}
            >
              Se Déconnecter
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
