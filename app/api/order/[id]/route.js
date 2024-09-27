// app/api/order/[id]/route.js
import { connectToDB } from "@utils/database";
import Order from "@/models/order";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req, { params }) {
  const { id } = params; // Extract the order ID from params

  try {
    await connectToDB();
    const order = await Order.findById(id).populate("user", "name email");

    if (order) {
      return new Response(JSON.stringify(order), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Commande introuvable" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    return new Response(
      JSON.stringify({ message: "Erreur interne du serveur" }),
      { status: 500 }
    );
  }
}

// Update order to paid
export async function PUT(req, { params }) {
  const { id } = params; // Extract the order ID from params
  await connectToDB();

  const session = await getServerSession({ req, ...authOptions });
  if (!session) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), {
      status: 401,
    });
  }

  try {
    const order = await Order.findById(id);

    if (order) {
      const paymentData = await req.json();

      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: paymentData.id,
        status: paymentData.status,
        update_time: paymentData.update_time,
        email_address: paymentData.email_address,
      };

      const updatedOrder = await order.save();
      return new Response(JSON.stringify(updatedOrder), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Commande introuvable" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error updating order:", error);
    return new Response(
      JSON.stringify({ message: "Erreur interne du serveur" }),
      { status: 500 }
    );
  }
}

// Mark order as delivered
export async function PUT_DELIVER(req, { params }) {
  const { id } = params; // Extract the order ID from params
  await connectToDB();

  const session = await getServerSession({ req, ...authOptions });
  if (!session) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), {
      status: 401,
    });
  }

  try {
    const order = await Order.findById(id);

    if (order) {
      order.isDelivered = true; // Correct spelling
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      return new Response(JSON.stringify(updatedOrder), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Commande introuvable" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error updating order delivery:", error);
    return new Response(
      JSON.stringify({ message: "Erreur interne du serveur" }),
      { status: 500 }
    );
  }
}
