// app/api/order/route.js
import { connectToDB } from "@utils/database";
import Order from "@/models/order";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await connectToDB();
    const session = await getServerSession({ req, ...authOptions });
    if (!session) {
      return new Response(JSON.stringify({ message: "Not authenticated" }), {
        status: 401,
      });
    }

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = await req.json();

    if (!orderItems || orderItems.length === 0) {
      return new Response(
        JSON.stringify({ message: "No items in the order" }),
        { status: 400 }
      );
    }

    const newOrder = new Order({
      orderItems,
      user: session.user.id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await newOrder.save();
    return new Response(JSON.stringify(createdOrder), { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    await connectToDB();
    const session = await getServerSession({ req, ...authOptions });

    if (!session) {
      return new Response(JSON.stringify({ message: "Not authenticated" }), {
        status: 401,
      });
    }

    const orders = await Order.find({ user: session.user.id })
      .sort({ createdAt: -1 })
      .populate("user", "id name email");

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
