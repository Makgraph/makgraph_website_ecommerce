// // components/Profile.js
// "use client";

import SideBar from "@components/profilecomponents/SideBar";

// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import LoadingSpinner from "@components/LoadingSpinner";
// import Message from "@components/ErrorMessage";
// import OrderList from "./ordertabs/page";
// import ProfileSettings from "./profiletabs/page";
// import ProfileLayout from "./ProfileLayout";

// const ProfileLayout = () => {
//   const { data: session } = useSession();
//   const [loading, setLoading] = useState(true);
//   const [currentTab, setCurrentTab] = useState("/profile/ordertabs");

//   useEffect(() => {
//     if (session) {
//       setLoading(false);
//     } else {
//       setLoading(false);
//     }
//   }, [session]);

//   if (loading) {
//     return (
//       <div className="flex min-h-[312.4px] justify-center items-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   return (
//     <ProfileLayout>
//       {currentTab === "/profile/profiletabs" && (
//         <ProfileSettings user={session?.user} />
//       )}
//       {currentTab === "/profile/ordertabs" && <OrderList />}
//     </ProfileLayout>
//   );
// };

// export default Profile;

export default function ProfileLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      {/* <div className="p-screen mt-20 md:mt-32 gap-2 flex justify-center "> */}
      <div className="mt-20 md:mt-32 h-full">
        <div className="p-screen md:flex md:gap-4">
          <div className="md:w-1/3">
            <SideBar />
          </div>
          <div className="md:w-2/3">{children}</div>
        </div>
      </div>
    </section>
  );
}
