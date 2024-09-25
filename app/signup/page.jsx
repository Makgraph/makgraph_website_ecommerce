"use client";

import Footer from "@components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const register = async (userData) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Inscription réussie !");
        router.push("/signin"); // Redirection vers la page de connexion
      } else {
        toast.error(data.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur de requête d'inscription :", error);
      toast.error("Erreur lors de l'inscription");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Les mots de passe ne correspondent pas");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      register(userData);
    }
  };

  return (
    <div>
      <div className="p-screen md:mt-12 pt-24">
        <div className="px-auto md:px-[250px] pb-12">
          <div className="rounded-lg border border-primary p-8 bg-secondaryContainer shadow-xl">
            <div className="flex flex-col items-center justify-center pb-4">
              <h3 className="font-serif md:flex hidden text-primary">
                Créez votre compte
              </h3>
              <h4 className="font-serif md:hidden text-primary">
                Créez votre compte
              </h4>
              <Link href="/signin">
                <p className="font-serif md:flex hidden text-error p-4 underline underline-offset-4 cursor-pointer hover:text-primary">
                  Vous avez déjà un compte ? Connectez-vous !
                </p>
                <p className="font-serif md:hidden text-[14px] text-error p-4 underline underline-offset-4 cursor-pointer hover:text-primary">
                  Vous avez déjà compte ? Connectez-vous !
                </p>
              </Link>
            </div>
            <form onSubmit={onSubmit} action="#" className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">
                  Nom
                </label>
                <input
                  className="font-serif w-full rounded-lg border-outline hover:bg-primary/10 hover:text-onPrimary p-3 text-sm"
                  placeholder="Entrez votre nom"
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <input
                  className="font-serif w-full rounded-lg border-outline hover:bg-primary/10 disabled:bg-error disabled:text-error p-3 text-sm"
                  placeholder="Entrez votre email"
                  type="email"
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
              <div>
                <label className="sr-only" htmlFor="password2">
                  Confirmer le mot de passe
                </label>
                <input
                  className="font-serif w-full rounded-lg border-outline hover:bg-primary/10 disabled:bg-error disabled:text-error p-3 text-sm"
                  placeholder="Confirmez votre mot de passe"
                  type="password"
                  id="password2"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                />
              </div>
              <div className="mt-4 p-4 flex justify-center">
                <button
                  type="submit"
                  className="flex justify-center items-center btn-primary w-[45%]"
                >
                  <span className="labellg font-sans font-semibold flex justify-center items-center">
                    Enregistrer
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
