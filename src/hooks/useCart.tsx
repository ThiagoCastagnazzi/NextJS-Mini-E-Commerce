import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  amount: number;
  description: string;
}

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
  clearCart: () => void;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      const storagedCart = localStorage.getItem("@ProblemCompany:cart");

      if (storagedCart) {
        return JSON.parse(storagedCart);
      }
    }

    return [];
  });

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount <= 0) {
        return;
      }

      const updatedCart = [...cart];
      const productExists = updatedCart.find(
        (product) => product.id === productId
      );

      if (productExists) {
        productExists.amount = amount;
        setCart(updatedCart);
        localStorage.setItem(
          "@ProblemCompany:cart",
          JSON.stringify(updatedCart)
        );
      } else {
        throw Error();
      }
    } catch {
      toast.error("Error Updating Product Amount");
    }
  };

  const addProduct = async (productId: number) => {
    try {
      const productExists = cart.find((product) => product.id === productId);

      if (productExists) {
        const updatedCart = cart.map((product) =>
          product.id === productId
            ? {
                ...product,
                amount: product.amount + 1,
              }
            : product
        );

        setCart(updatedCart);

        localStorage.setItem(
          "@ProblemCompany:cart",
          JSON.stringify(updatedCart)
        );

        return;
      }

      const response = await fetch(
        `/api/products/findProduct?id=${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const product = await response.json();

      const updatedCart = [...cart, { ...product, amount: 1 }];

      setCart(updatedCart);

      localStorage.setItem("@ProblemCompany:cart", JSON.stringify(updatedCart));
    } catch {
      toast.error("Error Adding Product");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const productExists = cart.find((product) => product.id === productId);

      if (productExists) {
        const updatedCart = cart.filter((product) => product.id !== productId);

        setCart(updatedCart);

        localStorage.setItem(
          "@ProblemCompany:cart",
          JSON.stringify(updatedCart)
        );
      } else {
        throw Error();
      }
    } catch {
      toast.error("Error Removing Product");
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("@ProblemCompany:cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        updateProductAmount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
