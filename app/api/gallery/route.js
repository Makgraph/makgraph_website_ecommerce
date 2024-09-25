import { connectToDB } from "@utils/database";
import GalleryItem from "@/models/gallery"; // Adjust the path if necessary

export async function GET(request) {
  await connectToDB();

  const { searchParams } = new URL(request.url); // Get search parameters from the URL
  const pageNumber = parseInt(searchParams.get("pageNumber")) || 1;
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";

  // Define the number of items per page
  const itemsPerPage = 4;

  // Logic to retrieve items from the gallery
  const query = {
    ...(keyword && { title: { $regex: keyword, $options: "i" } }),
    ...(category && { category }),
  };

  // Count the total number of items that match the query
  const totalCount = await GalleryItem.countDocuments(query);

  // Fetch the items with pagination
  const items = await GalleryItem.find(query)
    .skip((pageNumber - 1) * itemsPerPage) // Calculate items to skip
    .limit(itemsPerPage); // Limit to itemsPerPage

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Return the response with items and pagination info
  return new Response(JSON.stringify({ items, totalPages, totalCount }), {
    status: 200,
  });
}
