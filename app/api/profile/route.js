import { getServerSession } from "next-auth/next";
// import { authOptions } from "@utils/database"; // Adjust the import
import User from "@models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions); // Get the session

    if (!session) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    const { name, email, password } = await req.json();
    const userId = session.user.id; // Use user ID from session

    const user = await User.findById(userId); // Find user by ID
    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Update user information
    user.name = name || user.name;
    user.email = email || user.email;

    // If a password is provided, hash it and update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save(); // Save updated user

    return NextResponse.json(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error); // Log the error
    return NextResponse.json(
      { message: "Erreur du serveur. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
