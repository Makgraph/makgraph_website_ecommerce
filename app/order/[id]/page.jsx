"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Truck, MapPin } from "phosphor-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import moment from "moment";
import Message from "@components/ErrorMessage";
import { useCart } from "@components/context/CartContext";
import LoadingSpinner from "@components/LoadingSpinner";

const OrderScreen = ({ params }) => {
  const { data: session } = useSession();
  const { id } = params;
  const router = useRouter();
  const {  clearCart } = useCart();
  const [sdkReady, setSdkReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id || order) return; // Exit if id is not available or order is already fetched

      try {
        const response = await fetch(`/api/order/${id}`);
        if (!response.ok) {
          throw new Error("Erreur de chargement de la commande");
        }
        const data = await response.json();
        console.log(data);
        setOrder(data);
        // Clear the cart once the order is fetched successfully
        clearCart();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, order]);

  useEffect(() => {
    const addPayPalScript = async () => {
      if (sdkReady) return;
      try {
        const response = await fetch("/api/config");
        const { clientId } = await response.json();
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      } catch (error) {
        console.error("Erreur lors du chargement du script PayPal :", error);
      }
    };

    if (order && !order.isPaid && !window.paypal) {
      addPayPalScript();
    } else if (window.paypal) {
      setSdkReady(true);
    }
  }, [order, sdkReady]);

  const updateOrderPayment = async (details) => {
    try {
      const paymentData = {
        id: details.id,
        status: details.status,
        update_time: details.update_time,
        email_address: details.payer.email_address,
      };

      const response = await fetch(`/api/orders/${id}/pay`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du paiement");
      }

      const updatedOrder = await response.json();
      setOrder(updatedOrder);
    } catch (error) {
      console.error("Payment update failed:", error);
      setError(error.message);
    }
  };

  const successPaymentHandler = async (details) => {
    await updateOrderPayment(details);
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <Message variant="bg-danger dark:bg-danger-dark text-white">
        {error}
      </Message>
    );
  console.log(order);
  if (!order) {
    return <Message variant="bg-danger text-white">Order not found</Message>;
  }

  return (
    <PayPalScriptProvider
      options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
    >
      <div className="mt-20 md:mt-24">
        <div className="p-screen pt-4 md:pt-6 md:flex">
          {/* CLIENT */}
          <div className="md:w-1/3 flex bg-secondary/20 py-4">
            <div className="w-1/3">
              <div className="hidden md:flex bg-onSecondary/40 md:ml-4 w-14 h-14 justify-center items-center rounded-full">
                <User size={30} weight="fill" color="#216487" />
              </div>
              <div className="md:hidden flex bg-onSecondary/40 md:ml-4 ml-6 w-10 h-10 justify-center items-center rounded-full">
                <User size={22} weight="fill" color="#216487" />
              </div>
            </div>
            <div className="w-2/3 flex flex-col">
              <div className="md:text-base text-sm font-serif">
                <strong>Client</strong>
              </div>
              <p className="md:text-sm text-xs font-serif">
                {session?.user?.name}
              </p>
              <p className="md:text-sm text-xs font-serif">
                <a
                  href={`mailto:${session?.user?.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {session?.user?.email}
                </a>
              </p>
            </div>
          </div>

          {/* INFOS SUR LA COMMANDE */}
          <div className="md:w-1/3 flex bg-secondary/20 py-4">
            <div className="w-1/3">
              <div className="hidden md:flex bg-onSecondary/40 md:ml-4 w-14 h-14 justify-center items-center rounded-full">
                <Truck size={30} weight="fill" color="#216487" />
              </div>
              <div className="md:hidden flex bg-onSecondary/40 md:ml-4 ml-6 w-10 h-10 justify-center items-center rounded-full">
                <Truck size={22} weight="fill" color="#216487" />
              </div>
            </div>
            <div className="w-2/3 mr-4 flex flex-col">
              <div className="md:text-base text-sm font-serif">
                <strong>Informations sur la commande</strong>
              </div>
              <div className="md:text-sm text-xs font-serif">
                Mode de paiement: {order?.paymentMethod || "Not provided"}
              </div>
              {order.isPaid ? (
                <div className="bg-[#2563eb] mt-1 p-2">
                  <p className="text-onPrimary md:text-sm text-xs flex justify-center">
                    Payé {moment(order.paidAt).calendar()}
                  </p>
                </div>
              ) : (
                <div className="bg-error my-1 p-2">
                  <p className="text-onPrimary md:text-sm font-serif text-xs flex justify-center">
                    Impayé
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* LIVRAISON */}
          <div className="md:w-1/3 flex bg-secondary/20 py-4">
            <div className="w-1/3">
              <div className="hidden md:flex bg-onSecondary/40 md:ml-4 w-14 h-14 justify-center items-center rounded-full">
                <MapPin size={30} weight="fill" color="#216487" />
              </div>
              <div className="md:hidden flex bg-onSecondary/40 md:ml-4 ml-6 w-10 h-10 justify-center items-center rounded-full">
                <MapPin size={22} weight="fill" color="#216487" />
              </div>
            </div>
            <div className="w-2/3 md:pr-4 flex flex-col">
              <div className="md:text-base text-sm font-serif">
                <strong>Livré à</strong>
              </div>
              <div className="md:text-sm text-xs font-serif">
                Adresse: {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </div>
              {order.isDelivered ? (
                <div className="bg-[#2563eb] mt-1 p-2">
                  <p className="text-onPrimary md:text-sm text-xs flex justify-center">
                    Délivré le {moment(order.deliveredAt).calendar()}
                  </p>
                </div>
              ) : (
                <div className="bg-error my-1 p-2">
                  <p className="text-onPrimary font-serif md:text-sm text-xs flex justify-center">
                    Non livrés
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-screen md:py-6 md:flex">
          <div className="md:w-3/4">
            <div className="md:pr-8">
              {order.orderItems.length === 0 ? (
                <div className="m-20">
                  <h1 className="text-[18px] md:text-[32px]">
                    Votre Panier est vide !
                  </h1>
                </div>
              ) : (
                <ul className="w-[100%]">
                  {order.orderItems.map((item) => (
                    <div
                      className="w-[100%] h-[100%] md:h-[100px] shadow-[0_1px_3px_rgba(0,0,0,0.2)] md:rounded-[10px] rounded-[5px] md:px-5 px-2 py-1 md:py-0 my-2"
                      key={item._id}
                    >
                      <li className="h-[100%] w-[100%] flex md:justify-between justify-between items-center">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-[50px] rounded-[5px]"
                          />
                        </div>
                        <Link href={`/products/${item.product}`}>
                          <h5 className="md:text-base text-xs">
                            <b>{item.name}</b>
                          </h5>
                        </Link>
                        <div className="md:text-sm text-[10px] flex flex-col items-center justify-center">
                          <div className="font-serif text-[10px]">QUANTITÉ</div>
                          <span className="text-sm font-serif">{item.qty}</span>
                        </div>
                        <div className="md:text-sm text-xs font-serif flex flex-col items-center justify-center">
                          <div className="text-[10px] font-serif">
                            <h6 className="font-serif">Sous-total</h6>
                          </div>
                          <div>
                            <b>${(item.qty * item.price).toFixed(2)}</b>
                          </div>
                        </div>
                      </li>
                    </div>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:w-1/4 flex flex-col">
            <div className="max-w-screen-md">
              <table className="min-w-full bg-secondaryContainer shadow-md overflow-hidden">
                {/* <thead className="bg-[#94a3b8]">
                  <tr>
                    <th className="py-2 px-4 md:text-base text-sm font-serif text-left">
                      Résumé de la commande
                    </th>
                    <th className="py-2 px-4 md:text-base text-sm font-serif text-right">
                      Montant
                    </th>
                  </tr>
                </thead> */}
                <tbody className="divide-y divide-[#94a3b8]">
                  <tr>
                    <td className="py-2 px-4 md:text-base text-sm font-serif">
                      <b>Produits</b>
                    </td>
                    <td className="py-2 px-4 md:text-base text-sm font-serif">
                      $
                      {order?.itemsPrice ? order.itemsPrice.toFixed(2) : "0.00"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 md:text-base text-sm font-serif">
                      <b>Livraison</b>
                    </td>
                    <td className="py-2 px-4 md:text-base text-sm font-serif">
                      $
                      {order?.shippingPrice
                        ? order.shippingPrice.toFixed(2)
                        : "0.00"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 md:text-base text-sm font-serif">
                      <b>Taxe</b>
                    </td>
                    <td className="py-2 px-4 md:text-base text-sm font-serif">
                      ${order?.taxPrice ? order.taxPrice.toFixed(2) : "0.00"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 md:text-base text-sm font-serif">
                      <b>Total</b>
                    </td>
                    <td className="py-2 px-4 md:text-base text-sm font-serif">
                      $
                      {order?.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}
                    </td>
                  </tr>
                </tbody>
              </table>

              {!order.isPaid && (
                <div className="pt-4">
                  {loading && <LoadingSpinner />}
                  {!sdkReady ? (
                    <LoadingSpinner />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: { value: order.totalPrice.toFixed(2) },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        await actions.order.capture();
                        successPaymentHandler(data);
                      }}
                      onError={(err) => {
                        console.error("PayPal Error:", err);
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default OrderScreen;
