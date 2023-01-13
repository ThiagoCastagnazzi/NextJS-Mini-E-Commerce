import type { AppProps } from "next/app";

import "react-toastify/dist/ReactToastify.css";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../styles/theme";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SidebarDrawerProvider } from "../context/SidebarDrawerContext";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "../hooks/useCart";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
        <SidebarDrawerProvider>
          <QueryClientProvider client={new QueryClient()}>
            <CartProvider>
              <Component {...pageProps} />
            </CartProvider>
          </QueryClientProvider>
        </SidebarDrawerProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}
