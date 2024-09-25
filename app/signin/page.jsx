// "use client";
"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Footer from "@components/Footer";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      // Gérer les erreurs de connexion
      alert(result.error);
    } else {
      // Redirection ou action à effectuer après une connexion réussie
      // Par exemple, rediriger vers la page d'accueil
      window.location.href = "/";
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { redirect: false }).then((result) => {
      if (result.error) {
        alert(result.error);
      } else {
        window.location.href = `${process.env.NEXTAUTH_URL}/`;
      }
    });
  };

  return (
    <div>
      <div className="p-screen md:mt-12 pt-24">
        <div className="px-auto md:px-[250px] pb-12">
          <div className="rounded-lg border border-primary p-8 bg-secondaryContainer shadow-xl">
            <div className="flex flex-col items-center justify-center pb-4">
              <h3 className="font-serif text-primary md:flex hidden">
                Connectez-vous à votre compte.
              </h3>
              <h5 className="font-serif text-primary md:hidden">
                Connectez-vous à votre compte.
              </h5>
              <Link href="/signup">
                <p className="md:flex hidden font-serif text-error p-4 underline underline-offset-4 cursor-pointer hover:text-primary">
                  Pas de compte ? Créez-en un
                </p>
              </Link>
              <Link href="/signup">
                <p className="md:hidden font-serif text-error text-[14px] p-4 underline underline-offset-4 cursor-pointer hover:text-primary">
                  Pas de compte ? Créez-en un
                </p>
              </Link>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <input
                  className="font-serif w-full rounded-lg border-outline hover:bg-primary/5 p-3 text-sm"
                  placeholder="Entrez votre email"
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="password">
                  Mot de passe
                </label>
                <input
                  className="font-serif w-full rounded-lg border-outline hover:bg-primary/10 disabled:bg-error disabled:text-error p-3 text-sm"
                  placeholder="Entrez votre mot de passe"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex justify-center items-center btn-primary rounded-lg  w-[90%]"
                >
                  <span className="labellg font-sans font-semibold flex justify-center items-center">
                    Connexion
                  </span>
                </button>
              </div>
            </form>
            {/* Bouton Google */}
            <div className="flex items-center justify-center mt-4">
              <hr className="flex-grow border-gray-400" />
              <span className="mx-2 font-semibold text-gray-600">ou</span>
              <hr className="flex-grow border-gray-400" />
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleGoogleSignIn}
                className="flex justify-center items-center btn-icon bg-primary w-[90%] p-2 rounded-lg border border-gray-300"
              >
                <img
                  src="/assets/google_logo.png" // Remplace par le chemin vers ton logo Google
                  alt="Google Logo"
                  className="h-5 w-5 mr-2" // Ajuste la taille selon tes besoins
                />
                <span className="labellg font-sans font-semibold">
                  Connexion avec Google
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// import { useEffect, useState } from "react";
// import Footer from "@components/footer/page";
// import Link from "next/link";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const { email, password } = formData;

//   // Effect pour gérer le résultat de la connexion
//   useEffect(() => {}, []);

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     const userData = {
//       email,
//       password,
//     };

//     signin(userData);
//   };

//   return (
//     <div>
//       <div className="p-screen md:mt-12 pt-24">
//         <div className="px-auto  md:px-[250px] pb-12 ">
//           <div className="rounded-lg border border-primary p-8 bg-secondaryContainer shadow-xl ">
//             <div className="flex flex-col items-center justify-center pb-4">
//               <h3 className="font-serif text-primary md:flex hidden">
//                 Connectez-vous à votre compte.
//               </h3>
//               <h5 className="font-serif text-primary md:hidden">
//                 Connectez-vous à votre compte.
//               </h5>
//               <Link href="/signup">
//                 <p className="md:flex hidden font-serif text-error p-4 underline underline-offset-4 cursor-pointer hover:text-primary">
//                   Pas de compte ? Créez-en un
//                 </p>
//               </Link>
//               <Link href="/signup">
//                 <p className="md:hidden font-serif text-error text-[14px] p-4 underline underline-offset-4 cursor-pointer hover:text-primary">
//                   Pas de compte ? Créez-en un
//                 </p>
//               </Link>
//             </div>
//             <form onSubmit={onSubmit} action="#" className="space-y-4">
//               <div>
//                 <label className="sr-only" htmlFor="name">
//                   Name
//                 </label>
//                 <input
//                   className="font-serif w-full rounded-lg border-outline hover:bg-primary/5 p-3 text-sm"
//                   placeholder="Entrez votre email"
//                   type="text"
//                   id="email"
//                   name="email"
//                   value={email}
//                   onChange={onChange}
//                 />
//               </div>
//               <div>
//                 <label className="sr-only" htmlFor="name">
//                   Name
//                 </label>
//                 <input
//                   className="font-serif w-full rounded-lg border-outline hover:bg-primary/10 disabled:bg-error disabled:text-error   p-3 text-sm"
//                   placeholder="Entrez votre mot de passe"
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={password}
//                   onChange={onChange}
//                 />
//               </div>
//               <div className=" md:flex hidden justify-center p-4">
//                 <p className="  font-serif text-error underline underline-offset-4 cursor-pointer hover:text-primary ">
//                   Mot de passe Oublié ?
//                 </p>
//               </div>
//               <div className="flex md:hidden justify-center p-4">
//                 <p className="md:hidden text-[14px] font-serif  text-error underline underline-offset-4 cursor-pointer hover:text-primary ">
//                   Mot de passe Oublié ?
//                 </p>
//               </div>

//               <div className=" flex justify-center">
//                 <button
//                   type="submit"
//                   className="flex justify-center items-center btn-primary w-[45%]"
//                 >
//                   <span className="labellg font-sans font-semibold flex justify-center items-center">
//                     Connexion
//                   </span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
