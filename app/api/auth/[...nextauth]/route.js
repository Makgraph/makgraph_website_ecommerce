import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@models/user";
import { connectToDB } from "@utils/database";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.NEXTAUTH_SECRET, {
    expiresIn: "90d",
  });
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          await connectToDB(); // Connecte à la base de données
          const { email, password } = credentials;
          const user = await User.findOne({ email });

          if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = generateToken(user._id);
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              token: accessToken, // Assurez-vous que le token est correctement défini
            };
          } else {
            throw new Error("Invalid email or password");
          }
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Error during authorization");
        }
      },
    }),
  ],
  pages: {
    error: "/auth/error", // Redirection en cas d'erreur
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl; // Redirection vers la page d'accueil
    },
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await connectToDB();
        const existingUser = await User.findOne({ email: profile.email });
        if (!existingUser) {
          const newUser = new User({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          });
          await newUser.save();
        }
      }
      return true; // Permettre la connexion
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.token = user.token || null; // Assurez-vous que le token est assigné
        console.log("JWT token created:", token); // Débogage
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.token = token.token || null; // Assurez-vous que le token est assigné
      console.log("Session created:", session); // Débogage
      return session;
    },
  },
});

export { handler as GET, handler as POST };
