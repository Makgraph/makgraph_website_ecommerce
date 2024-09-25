import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.NEXTAUTH_SECRET, {
    expiresIn: "90d",
  });
};

export default generateToken;
