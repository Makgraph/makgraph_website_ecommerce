"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@components/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "@components/ErrorMessage";

const ProfileSetting = () => {
  const { data: session, status } = useSession();
  const [updatedProfile, setUpdatedProfile] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(session);
  useEffect(() => {
    if (status === "authenticated") {
      setUpdatedProfile({
        name: session.user.name,
        email: session.user.email,
      });
    }
  }, [session, status]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Password match validation
    if (updatedProfile.password !== updatedProfile.password2) {
      toast.error("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`,
        },
        body: JSON.stringify(updatedProfile),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de la mise à jour du profil. Veuillez réessayer.");
      }
      // if (!response.ok) {
      //   throw new Error(
      //     "Échec de la mise à jour du profil. Veuillez réessayer."
      //   );
      // }

      const updatedUser = await response.json();
      toast.success("Mise à jour du profil réussie");
      setUpdatedProfile({
        name: updatedUser.name,
        email: updatedUser.email,
        password: "",
        password2: "",
      });
    } catch (error) {
      setError(error);
      toast.error("Échec de la mise à jour du profil. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  {
    loading && (
      <div className="flex justify-center items-center min-h-[249.83px]">
        <LoadingSpinner />
      </div>
    );
  }
  {
    error && (
      <Message variant="bg-danger dark:bg-danger-dark text-white">
        {error}
      </Message>
    );
  }

  return (
    <div>
      <ToastContainer />
      {session && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="md:grid grid-cols-2 gap-5">
            <div className="flex flex-col md:gap-8">
              <div className="py-1">
                <label className="sr-only" htmlFor="name">
                  Nom
                </label>
                <input
                  className="w-full font-serif rounded-md md:rounded-lg cursor-pointer border-primary border md:border-2 hover:bg-primary/5 p-3 text-sm"
                  placeholder="Nom d'utilisateur"
                  type="text"
                  id="name"
                  name="name"
                  value={updatedProfile.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="py-1">
                <label className="sr-only" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full font-serif rounded-md md:rounded-lg cursor-pointer border-black border md:border-2 hover:bg-primary/10 p-3 text-sm"
                  placeholder="Nouveau mot de passe"
                  type="password"
                  id="password"
                  name="password"
                  value={updatedProfile.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col md:gap-8">
              <div className="py-1">
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full font-serif rounded-md md:rounded-lg cursor-pointer border-onSecondary border md:border-2 hover:bg-primary/10 p-3 text-sm"
                  placeholder="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={updatedProfile.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="py-1">
                <label className="sr-only" htmlFor="password2">
                  Confirmez mot de passe
                </label>
                <input
                  className="w-full font-serif rounded-md md:rounded-lg cursor-pointer border-secondary border md:border-2 hover:bg-primary/20 p-3 text-sm"
                  placeholder="Confirmez nouveau mot de passe"
                  type="password"
                  id="password2"
                  name="password2"
                  value={updatedProfile.password2}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="md:mt-4 p-4 flex justify-center">
            <button
              type="submit"
              className="flex justify-center items-center btn-primary w-full"
            >
              <span className="labellg font-sans font-semibold flex justify-center items-center">
                PROFIL UPDATE
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileSetting;