"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@components/context/CartContext";
import LoadingSpinner from "./../../components/LoadingSpinner";
import { User, Truck, MapPin } from "phosphor-react";

const PlaceOrderScreen = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { cartItems, shippingAddress, paymentMethod } = useCart();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for a short time to avoid flicker
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300); // Adjust the duration as needed (300ms in this case)

    return () => clearTimeout(timeout);
  }, []);


  // Calculate Pricez
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );

  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);

  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));

  const totalPriceCalc = (
    Number(itemsPrice) +
    Number(taxPrice) +
    Number(shippingPrice)
  ).toFixed(2);

  const placeOrderHandler = async () => {
    // Déclarez la fonction comme asynchrone ici
    const orderItems = cartItems.map((item) => ({
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      qty: item.quantity,
      product: item.product._id,
    }));

    const orderData = {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice: totalPriceCalc,
    };
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
  
      const data = await response.json();
      console.log(data);
      router.push(`/order/${data._id}`);
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-20 md:mt-24">
        <div className="p-screen pt-4 md:pt-6 md:flex">
          {/* Client Information */}
          <div className="md:w-1/3 flex bg-secondary/20 py-3">
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
                <b>Client</b>
              </div>
              <div className="md:text-sm text-xs font-serif">
                {session?.user?.name}
              </div>
              <div className="md:text-sm text-xs font-serif">
                {session?.user?.email}
              </div>
            </div>
          </div>
          {/* Order Information */}
          <div className="md:w-1/3 flex bg-secondary/20 py-3">
            <div className="w-1/3">
              <div className="hidden md:flex bg-onSecondary/40 md:ml-4 w-14 h-14 justify-center items-center rounded-full">
                <Truck size={30} weight="fill" color="#216487" />
              </div>
              <div className="md:hidden flex bg-onSecondary/40 md:ml-4 ml-6 w-10 h-10 justify-center items-center rounded-full">
                <Truck size={22} weight="fill" color="#216487" />
              </div>
            </div>
            <div className="w-2/3 flex flex-col">
              <div className="md:text-base text-sm font-serif">
                <b>Informations sur la commande</b>
              </div>
              <div className="md:text-sm text-xs font-serif">
                Shipping: {shippingAddress?.country || "Not provided"}
              </div>
              <div className="md:text-sm text-xs font-serif">
                Mode de paiement: {paymentMethod || "Not selected"}
              </div>
            </div>
          </div>
          {/* Shipping Address */}
          <div className="md:w-1/3 flex bg-secondary/20 py-3">
            <div className="w-1/3">
              <div className="hidden md:flex bg-onSecondary/40 md:ml-4 w-14 h-14 justify-center items-center rounded-full">
                <MapPin size={30} weight="fill" color="#216487" />
              </div>
              <div className="md:hidden flex bg-onSecondary/40 md:ml-4 ml-6 w-10 h-10 justify-center items-center rounded-full">
                <MapPin size={22} weight="fill" color="#216487" />
              </div>
            </div>
            <div className="w-2/3 flex flex-col">
              <div className="md:text-base text-sm font-serif">
                <strong>Livrer à</strong>
              </div>
              <div className="md:text-sm text-xs font-serif">
                Adresse: {shippingAddress?.city}, {shippingAddress?.address},
                {shippingAddress?.postalCode}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-screen md:py-6 md:flex">
          <div className="md:w-3/4">
            <div className="md:pr-8">
              {cartItems.length === 0 ? (
                <div className="m-20">
                  <span className="font-semibold font-serif flex justify-center md:text-2xl">
                    Votre Panier est vide !
                  </span>
                </div>
              ) : (
                <>
                  <ul className="w-[100%]">
                    {cartItems.map((item, index) => (
                      <div
                        className=" w-[100%]  h-[100%] md:h-[100px] shadow-[0_1px_3px_rgba(0,0,0,0.2)] md:rounded-[10px] rounded-[5px] md:px-5 px-2 py-1 md:py-0 my-2"
                        key={index}
                      >
                        <li
                          className="h-[100%] w-[100%] flex md:justify-between justify-between items-center"
                          key={item.product._id}
                        >
                          <img
                            src={item.product.image}
                            alt={item.name}
                            className="w-[50px] rounded-[5px]"
                          />
                          <Link href={`/products/${item.product._id}`}>
                            <h5 className="md:text-base text-xs font-serif">
                              <b>{item.product.name}</b>
                            </h5>
                          </Link>

                          <div className="md:text-sm text-[10px] font-serif flex flex-col items-center justify-center">
                            <div className="font-serif text-[10px]">
                              QUANTITÉ
                            </div>
                            <span className="text-sm font-serif">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="md:text-sm text-xs font-serif flex flex-col items-center justify-center">
                            <div className="text-[10px] ">
                              <h6 className="font-serif">Sous-total</h6>
                            </div>
                            <div>
                              <b>$ {item.quantity * item.product.price}</b>
                            </div>
                          </div>
                        </li>
                      </div>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="md:w-1/4 flex flex-col">
            <div className="max-w-screen-md">
              <table className="min-w-full bg-secondaryContainer shadow-md overflow-hidden">
                <thead className="bg-[#94a3b8]"></thead>
                <tbody className="divide-y divide-[#94a3b8]">
                  <tr>
                    <td className="py-2 px-4 md:text-base text-sm font-serif">
                      <b>Produits</b>
                    </td>
                    <td className="py-2 px-4 md:text-base text-sm font-serif">
                      $ {itemsPrice}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 md:text-base text-sm font-serif">
                      <b>Shipping</b>
                    </td>
                    <td className="py-2 px-4 md:text-base text-sm font-serif">
                      $ {shippingPrice}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 md:text-base text-sm font-serif">
                      <b>Taxe</b>
                    </td>
                    <td className="py-2 px-4 md:text-base text-sm font-serif">
                      $ {taxPrice}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 md:text-base text-sm font-serif">
                      <b>Total</b>
                    </td>
                    <td className="py-2 px-4 md:text-base text-sm font-serif">
                      $ {totalPriceCalc}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              type="submit"
              className="w-full bg-primary/90 font-sans font-semibold text-white py-2 px-4  hover:bg-primary focus:outline-none focus:ring-2 focus:bg-[#22c55e] focus:ring-offset-2"
              onClick={placeOrderHandler}
            >
              Passer la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
