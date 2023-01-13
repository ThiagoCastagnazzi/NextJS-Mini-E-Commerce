import {
  Flex,
  Text,
  Icon,
  HStack,
  Box,
  Avatar,
  useBreakpointValue,
  IconButton,
  Button,
  Link,
} from "@chakra-ui/react";

import { RiUserAddLine, RiMenuLine } from "react-icons/ri";

import { useSidebarDrawer } from "../../context/SidebarDrawerContext";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";

export default function Header() {
  const CartIcon = dynamic(() => import("../../components/CartIcon"), {
    ssr: false,
  });

  const router = useRouter();
  const { onOpen } = useSidebarDrawer();

  const { data: session } = useSession();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  function handleSignOut() {
    signOut();

    router.push("/");
  }

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        ></IconButton>
      )}

      <Link href="/" variant="unstyled">
        <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
          Solution Company
          <Text as="span" ml="1" color="pink.500">
            .
          </Text>
        </Text>
      </Link>

      <Flex align="center" ml="auto">
        <HStack spacing="8" mx="8" pr="8" py="1">
          <CartIcon />
        </HStack>

        {session ? (
          <Flex align="center">
            {session?.user?.role === "admin" && (
              <Link href="/admin/products" borderEndWidth={1} mr={4}>
                <Button
                  fontSize={13}
                  fontWeight="bold"
                  color="white"
                  ml="2"
                  colorScheme="pink"
                  mr={6}
                >
                  Admin
                </Button>
              </Link>
            )}
            <Box mr="4" textAlign="right">
              <Text>{session.user.name}</Text>
              <Text color="gray.300" fontSize="small">
                {session?.user.email}
              </Text>
              <Flex align="center" justify="flex-end">
                <Link
                  href="/account"
                  color="gray.300"
                  fontSize="small"
                  fontWeight="bold"
                  mt={4}
                >
                  My-Account
                </Link>
              </Flex>
            </Box>
            <Flex
              direction="column"
              align="center"
              justifyItems="center"
              gap={2}
            >
              <Avatar
                bg="pink.600"
                size="md"
                name={session.user?.name}
                color="white"
              />
              <Button
                variant="unstyled"
                fontSize={13}
                fontWeight="bold"
                color="gray.300"
                height="18px"
                onClick={() => handleSignOut()}
              >
                SignOut
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Flex align="center" ml="auto">
            <Flex align="center">
              <HStack
                spacing="8"
                mr="8"
                mx="8"
                pr="8"
                py="1"
                color="gray.300"
                borderColor="gray.700"
              ></HStack>
              <Flex mr="4" textAlign="right" align="center">
                <Flex
                  align="center"
                  mr="4"
                  mx="8"
                  pr="8"
                  py="1"
                  color="gray.300"
                  borderRightWidth={1}
                  borderColor="gray.700"
                >
                  <Link
                    href="/login"
                    color="gray.300"
                    fontSize="small"
                    fontWeight="bold"
                  >
                    Login
                  </Link>
                </Flex>
                <Icon as={RiUserAddLine} fontSize="20" />
                <Link
                  href="/register"
                  color="gray.300"
                  fontSize="small"
                  fontWeight="bold"
                >
                  Register
                </Link>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
