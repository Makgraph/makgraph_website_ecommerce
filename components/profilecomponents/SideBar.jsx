// components/Profile.js
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserCircle } from "phosphor-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import moment from "moment";
import LoadingSpinner from "@components/LoadingSpinner";

const SideBar = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  //   const [currentTab, setCurrentTab] = useState("/profile/ordertabs");

  useEffect(() => {
    if (session) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex min-h-[312.4px] justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    // <div className="mt-20 md:mt-24 h-full">
    <div className="">
      <div className=" bg-secondary/20 py-4">
        <div className="flex flex-col justify-center items-center">
          <div className="flex gap-4">
            <div className="hidden md:flex w-2/5">
              <UserCircle size={140} color="#216487" />
            </div>
            <div className="md:hidden w-2/5">
              <UserCircle size={100} color="#216487" />
            </div>
            <div className="w-3/5 flex flex-col text-[12px] justify-center items-center">
              <h5 className="font-serif">
                <b>{session?.user?.name}</b>
              </h5>
              <div className="font-serif">
                rejoint {moment(session?.user?.createdAt).format("LL")}
              </div>
              <div className="font-serif">
                {session?.user?.isAdmin && (
                  <a
                    // href="http://localhost:5176" // pour development
                    href="https://makgraph-website-dashboard.vercel.app/" // pour production
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 font-bold text-md"
                  >
                    Go to dashboard
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 w-full gap-1 flex flex-col justify-center items-center">
            <nav className="w-full">
              <div className="w-full">
                <Link
                  className={`link ${
                    pathname === "/profile" ? "bg-onSecondary" : ""
                  }`}
                  href="/profile"
                >
                  <button className="font-serif bg-tertiary w-full text-[12px]  hover:bg-onSecondary focus:bg-onSecondary focus:text-onPrimary hover:text-white py-2 px-20">
                    PARAMÈTRES DE PROFIL
                  </button>
                </Link>
              </div>
            </nav>
            <nav className="w-full">
              <div className="w-full">
                <Link
                  className={`link ${
                    pathname === "/profile/ordertabs" ? "bg-onSecondary" : ""
                  }`}
                  href="/profile/ordertabs"
                >
                  <button className="font-serif bg-tertiary w-full text-[12px] focus: hover:bg-secondary focus:bg-secondary focus:text-onPrimary hover:text-white py-2 px-20">
                    LISTE DES COMMANDES
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
