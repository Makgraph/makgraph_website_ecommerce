import { NextResponse } from "next/server";
import User from "@models/user";
import bcrypt from "bcryptjs";
import generateToken from "@utils/generateToken";

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Veuillez remplir tous les champs" },
      { status: 400 }
    );
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return NextResponse.json(
      { message: "Utilisateur déjà existé" },
      { status: 400 }
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const token = generateToken(user._id);
    user.token = token;
    await user.save();

    return NextResponse.json(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
      },
      { status: 201 }
    );
  } else {
    return NextResponse.json(
      { message: "Données d'utilisateur invalides" },
      { status: 400 }
    );
  }
}
