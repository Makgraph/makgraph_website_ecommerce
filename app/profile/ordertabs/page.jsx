"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@components/LoadingSpinner";
import Link from "next/link";
import moment from "moment";
import { useSession } from "next-auth/react";

const OrderList = () => {
  const { data: session } = useSession();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session) return;

      try {
        const response = await fetch("/api/order"); // Adjust endpoint as necessary
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrderList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          {orderList.length === 0 ? (
            <div>
              No Orders
              <Link href="/">START SHOPPING</Link>
            </div>
          ) : (
            <table className="min-w-full bg-white border-collapse border border-[#e5e7eb]">
              <thead>
                <tr className="bg-onSecondary/50">
                  <th className="border border-secondary/40 px-4 py-2 font-serif">
                    ID
                  </th>
                  <th className="border border-primary/40 px-4 py-2 font-serif">
                    STATUS
                  </th>
                  <th className="border border-primary/40 px-4 py-2 font-serif">
                    DATE
                  </th>
                  <th className="border border-primary/40 px-4 py-2 font-serif">
                    TOTAL
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order) => (
                  <tr
                    key={order._id}
                    className={`${
                      order.isPaid
                        ? "bg-onPrimary font-serif"
                        : "bg-primary/25 font-sans"
                    }`}
                  >
                    <td className="border border-primary/40 px-4 py-2 font-serif">
                      {order._id}
                    </td>
                    <td className="border border-primary/40 px-4 py-2 font-serif">
                      {order.isPaid ? <>Payé</> : <>Impayé</>}
                    </td>
                    <td className="border border-primary/40 px-4 py-2 font-serif">
                      {order.isPaid
                        ? moment(order.paidAt).calendar()
                        : moment(order.createdAt).calendar()}
                    </td>
                    <td className="border border-primary/40 px-4 py-2 font-serif">
                      {order.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default OrderList;