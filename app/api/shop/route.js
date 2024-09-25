import { connectToDB } from "@utils/database";
import Product from "@/models/shop";
import { NextResponse } from "next/server";

// Connect to the database once
connectToDB();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const pageSize = 4; // Number of products per page
    const page = Number(searchParams.get("pageNumber")) || 1;

    // Keyword filter
    const keyword = searchParams.get("keyword")
      ? {
          name: {
            $regex: searchParams.get("keyword"),
            $options: "i", // Case insensitive search
          },
        }
      : {};

    // Filter by sizes and colors if provided in the query params
    const filters = {
      ...keyword,
      ...(searchParams.get("sizes")
        ? { sizes: { $in: searchParams.get("sizes").split(",") } }
        : {}),
      ...(searchParams.get("colors")
        ? { colors: { $in: searchParams.get("colors").split(",") } }
        : {}),
    };

    // Count total products matching the filters
    const count = await Product.countDocuments(filters);

    // Fetch products with pagination and sorting
    const products = await Product.find(filters)
      .sort({ _id: -1 }) // Sort by most recent
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    // Return response with products and pagination data
    return NextResponse.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      count, // Total number of matching products
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
