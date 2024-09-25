"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ShoppingCart, UserCircle } from "phosphor-react";
import { useState } from "react";
import { useCart } from "@components/context/CartContext";
import SecondHeader from "./SecondHeader";
import { navLinks } from "./NavLinks";
import Dropdown from "./Dropdown";
import { useSearch } from "@components/context/SearchContext";

export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { totalQuantity } = useCart();
  const { keyword, setKeyword, pageNumber, setPageNumber } = useSearch();

  return (
    <div>
      <div className="z-10 fixed top-0 left-0 w-full">
        <div className="flex justify-center items-center md:justify-between bg-surfaceContainer py-2 md:px-6 lg:px-[156px] xl:px-[200px] sm:px-8 px-7">
          <div
            onClick={() => setOpen(!open)}
            className="md:hidden flex text-3xl absolute left-6 top-6 cursor-pointer"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>

          <div>
            <Link href="/">
              <Image
                className="ml-36 sm:ml-10 w-16 h-12 sm:w-20 sm:h-14 md:ml-0 md:flex md:w-40 md:h-20"
                src="/assets/logo_Makgraph.png"
                alt="Logo"
                width={160}
                height={80}
              />
            </Link>
          </div>

          {/* MOBILE HEADER */}
          <div className="md:hidden absolute right-6 top-6">
            <div className="flex md:gap-3">
              {session ? (
                <Dropdown />
              ) : (
                <Link href="signin">
                  <div className="px-2">
                    <UserCircle size={30} />
                  </div>
                </Link>
              )}
              <Link href="/cartScreen">
                <div className="relative">
                  <div className="bg-error absolute h-4 w-4 md:h-4 md:w-4 rounded-[50%] -right-1 -top-[5px] md:-right-2 md:-top-[6px]">
                    <span className="text-white font-sans text-[10px] md:text-[11px] md:pb-2 flex justify-center items-center">
                      {totalQuantity}
                    </span>
                  </div>
                  <ShoppingCart size={28} />
                </div>
              </Link>
            </div>
          </div>

          <div className="sm:flex w-full flex-col justify-center items-center">
            <SecondHeader
              keyword={keyword}
              setKeyword={setKeyword}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
            <ul
              className={`md:flex md:items-center md:py-2 pb-12 absolute bg-surfaceContainer md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:px-0 pl-6 transition-all md:transition-none duration-500 ease-in ${
                open ? "top-[60px] opacity-100" : "top-[-490px]"
              } md:opacity-100 opacity-0`}
            >
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className="w-full md:w-[62px] text-[13px] font-serif h-5 justify-center items-center flex md:my-0 my-7 md:bg-surfaceContainer hover:bg-primary/10 duration-300"
                >
                  <nav>
                    <Link
                      className={`link ${
                        pathname === `/${link.desc}` ? "text-primary" : ""
                      }`}
                      href={`/${link.desc}`}
                    >
                      {link.title}
                    </Link>
                  </nav>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-6 items-center md:flex hidden gap-2">
            <div>
              {session ? (
                <Dropdown />
              ) : (
                <Link href="/signin">
                  <div className="relative flex w-32 bg-onSecondaryContainer/5 p-1">
                    <UserCircle size={28} />
                    <button className="focus:bg-secondaryContainer">
                      <span className="text-[14px] font-serif px-transition hover:text-primary duration-300">
                        Se Connecter
                      </span>
                    </button>
                  </div>
                </Link>
              )}
            </div>
            <nav>
              <Link
                className={`link ${
                  pathname === "/cartscreen"
                    ? "text-primary"
                    : ""
                }`}
                href="/cartscreen"
              >
                <div className="relative flex bg-[#d3e2f7] hover:bg-[#b4d1f9] p-1">
                  <ShoppingCart size={24} />
                  <button className="focus:bg-secondaryContainer">
                    <h5 className="text-[14px] font-serif text-primary font-normal px-1 hover:bg-[#b4d1f9] duration-300">
                      Panier
                    </h5>
                  </button>
                  <div className="bg-error mt-1 h-4 w-4 md:h-4 md:w-4 rounded-[50%]">
                    <span className="text-white font-sans text-[10px] md:text-[11px] flex justify-center items-center">
                      {totalQuantity}
                    </span>
                  </div>
                </div>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
