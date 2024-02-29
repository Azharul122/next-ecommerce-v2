import { CartProvider } from "./Provider/CartContext";

export function GlobalProviders({ children }) {
    return <CartProvider>{children}</CartProvider>;
  }