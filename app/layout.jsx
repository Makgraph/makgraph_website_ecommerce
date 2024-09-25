import "@styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import Header from "@components/headercomponents/Header";
import Provider from "@components/Provider";
import { CartProvider } from "../components/context/CartContext";
import { ToastContainer } from "react-toastify";
import { SearchProvider } from "@components/context/SearchContext";

export const metadata = {
  title: "Makgraph_website_nextjs",
  description: "Ecommerce and shop app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
          async
        ></script>
      </head>
      <body>
        <Provider>
          <CartProvider>
            <SearchProvider>
            <Header />
            <main>{children}</main>
            <ToastContainer />
            </SearchProvider>
          </CartProvider>
        </Provider>
      </body>
    </html>
  );
}
