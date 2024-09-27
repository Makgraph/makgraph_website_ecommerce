"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@components/context/CartContext";

function PaymentScreen() {
  const { paymentMethod, updatePaymentMethod } = useCart();
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    router.push("/order");
  };

  return (
    <div className="p-screen md:mt-20 pt-24">
      <div className="px-auto  md:px-[250px] pb-12 ">
        <div className="rounded-lg border border-primary p-6 md:p-8 shadow-xl ">
          <div className="flex flex-col items-center justify-center pb-4">
            <h5 className="text-onSurface font-bold font-serif md:flex hidden">
              MODE DE PAIEMENT
            </h5>
            {/* MOBILE SCREEN */}
            <h6 className="text-[11px] text-onSurface font-bold font-serif md:hidden">
              MODE DE PAIEMENT
            </h6>
          </div>

          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                className="block text-sm font-serif font-semibold mb-2"
                for="option1"
              >
                Choisissez une option:
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-500"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={() => updatePaymentMethod("paypal")}
                  />
                  <span className="ml-2 text-sm md:text-base font-serif">
                    PayPal
                  </span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio text-blue-500"
                    name="paymentMethod"
                    value="creditCard"
                    checked={paymentMethod === "creditCard"}
                    onChange={() => updatePaymentMethod("creditCard")}
                    id="option2"
                  />
                  <span className="ml-2 text-sm md:text-base font-serif">
                    Carte de Crédit
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-center">
              <span className="my-2 bg-primary rounded-md flex justify-center focus:bg-[#22c55e]  cursor-pointertransition hover:bg-onPrimary  text-white hover:text-primary">
                <button
                  type="submit"
                  className="px-8 md:px-16 py-1 md:py-2 font-sans font-semibold text-sm md:text-base transition focus:bg-[#22c55e] focus:rounded-md focus:text-onPrimary"
                >
                  Enregistrer le mode de paiement
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentScreen;
