import { FacebookLogo, InstagramLogo, PinterestLogo } from "phosphor-react";
import { IonIcon } from "@ionic/react";
import { logoFacebook, logoInstagram, logoPinterest } from "ionicons/icons";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="p-screen py-12">
      <div className="grid md:grid-cols-2 gap-5 py-8 min-h-[185.83px] ">
        <div className=" gap-3 flex flex-col">
          <h6>
            <b>Entrer en Contact</b>
          </h6>
          <h6 className="font-sans">makgraph@gmail.com</h6>
          <h6 className="font-sans">+(509) 3604-3023</h6>
        </div>
        <div className="flex flex-col">
          <div>
            <h6 className="pb-4">
              <b>Lettre d'information</b>
            </h6>
            <h6 className="font-sans">
              Pour les Promotions, nouveaux produits et ventes. Directement dans
              votre boîte de réception.
            </h6>
          </div>
          <form
            action="#"
            className=" mt-4 gap-1 grid grid-cols-[8fr_repeat(1,_2fr)] w-100%"
          >
            <div>
              <label className="sr-only" htmlFor="email">
                Name
              </label>
              <input
                className="w-full rounded-md border-[1px] border-primary hover:bg-primary/5 p-2 text-sm"
                placeholder="Email"
                type="email"
                id="foremail"
              />
            </div>

            <div className="">
              <button className="w-100% inline-block items-center justify-center rounded-md bg-primary py-2 px-3 text-sm font-medium text-onPrimary transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50">
                <span className="font-sans font-semibold">S'inscrire</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center py-4 border-t-[1px] border-b-[1px] border-primary/15 min-h-[53.33px]">
        <IonIcon
          icon={logoFacebook}
          className="text-onSurface px-2 text-lg md:text-xl"
        />
        <IonIcon
          icon={logoInstagram}
          className="text-onSurface px-2 text-lg md:text-xl"
        />
        <IonIcon
          icon={logoPinterest}
          className="text-onSurface px-2 text-lg md:text-xl"
        />
      </div>
      <div className="flex justify-between py-2 min-h-[48px]">
        <h6>@ 2024 designed by makgraph</h6>
        <div className="flex gap-4">
          <Image src="/assets/paypal.png" width={48} height={32} alt="paypal" />

          <Image
            src="/assets/moncash.png"
            width={48}
            height={32}
            alt="moncash"
          />
          {/* <img src={monCash} alt="moncash" className="w-8 h-8" /> */}
        </div>
      </div>
    </div>
  );
}
