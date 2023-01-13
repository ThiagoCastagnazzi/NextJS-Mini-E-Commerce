import { Flex, Heading } from "@chakra-ui/react";
import Header from "../../components/Header";

import { getSession } from "next-auth/react";

import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";

const CartItems = dynamic(() => import("../../components/Cart"), {
  ssr: false,
});

export default function Cart() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Flex flex="1" direction="column" gap={4}>
          <Heading size="lg" fontWeight="normal">
            My Cart
          </Heading>

          <CartItems />
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
