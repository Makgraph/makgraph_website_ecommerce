import { connectToDB } from "@utils/database";
import Order from "@/models/order";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Connect to the database
      await connectToDB();

      // Retrieve the session (user info)
      const session = await getSession({ req });
      if (!session) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      // Destructure the request body
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      // Validate that there are order items
      if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: "No items in the order" });
      }

      // Create a new order
      const newOrder = new Order({
        orderItems,
        user: session.user.id, // Assuming session user has an 'id' field
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      // Save the order to the database
      const createdOrder = await newOrder.save();

      // Send back the newly created order
      return res.status(201).json(createdOrder);
    } catch (error) {
      // Handle any errors during order creation
      console.error("Error creating order:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // If the method is not POST, return an error
    return res.status(405).json({ message: "Method not allowed" });
  }
}
