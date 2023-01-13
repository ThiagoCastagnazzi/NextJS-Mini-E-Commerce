import {
  Box,
  Card,
  Flex,
  Link,
  SimpleGrid,
  Text,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";

import { AiOutlineUser } from "react-icons/ai";
import { BsFillHandbagFill } from "react-icons/bs";
import Header from "../../components/Header";

import Head from "next/head";

export default function Account() {
  return (
    <>
      <Head>
        <title>My Account</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" h="100vh">
        <ToastContainer position="bottom-center" />

        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Box
            flex="1"
            borderRadius={8}
            bg="gray.800"
            p={["6", "8"]}
            overflow="auto"
          >
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Link href="/account/edit">
                <Card p="6">
                  <Box>
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      textAlign="center"
                    >
                      <Flex align="center" justify="center" gap={3}>
                        <Icon color="white" as={AiOutlineUser} fontSize="3xl" />
                        <Text color="gray.300" fontSize="lg">
                          My Account
                        </Text>
                      </Flex>
                    </Box>
                  </Box>
                </Card>
              </Link>

              <Link href="/account/orders">
                <Card p="6">
                  <Box>
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      textAlign="center"
                    >
                      <Flex align="center" justify="center" gap={3}>
                        <Icon
                          color="white"
                          as={BsFillHandbagFill}
                          fontSize="3xl"
                        />
                        <Text color="gray.300" fontSize="lg">
                          My Orders
                        </Text>
                      </Flex>
                    </Box>
                  </Box>
                </Card>
              </Link>
            </SimpleGrid>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
