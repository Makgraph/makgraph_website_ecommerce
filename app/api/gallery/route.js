import { connectToDB } from "@utils/database";
import GalleryItem from "@/models/gallery"; // Adjust the import based on your model
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const pageNumber = searchParams.get("pageNumber") || 1;
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";

  try {
    await connectToDB();

    const query = {};
    if (keyword) {
      query.name = { $regex: keyword, $options: "i" }; // Example regex for keyword search
    }
    if (category) {
      query.category = category;
    }

    const itemsPerPage = 4;
    const items = await GalleryItem.find(query)
      .skip((pageNumber - 1) * itemsPerPage)
      .limit(itemsPerPage);
    const totalItems = await GalleryItem.countDocuments(query);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return new Response(JSON.stringify({ items, totalPages }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
