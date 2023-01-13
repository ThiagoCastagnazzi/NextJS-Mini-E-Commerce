import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { Input } from "../../../../components/Form/Input";
import Link from "next/link";
import { prisma } from "../../../../lib/prisma";
import { GetServerSideProps } from "next";
import Header from "../../../../components/Header";

import Head from "next/head";

interface UserProps {
  users: Users[];
}

interface Users {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateUserFomData {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "Passwords must match"),
});

export default function CreateUser({ users }: UserProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFomData>({
    resolver: yupResolver(createUserFormSchema),
  });

  async function handleCreateAdmin(values: CreateUserFomData) {
    if (users.find((user) => user.email === values.email)) {
      toast.error("E-mail already exists");
      return;
    }

    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: "admin",
    };

    try {
      fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    } catch (error) {
      toast.error("Error creating user");
    }

    router.push("/admin/products");
  }

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction="column" h="100vh">
        <ToastContainer position="bottom-center" />

        <Header />
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["4", "6"]}>
          <Box
            as="form"
            flex="1"
            borderRadius="8"
            bg="gray.800"
            p={["6", "8"]}
            onSubmit={handleSubmit(
              async (values) => await handleCreateAdmin(values)
            )}
          >
            <Heading size="lg" fontWeight="normal">
              Register Admin
            </Heading>

            <Divider my="6" borderColor="gray.700" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input
                  label="Full Name"
                  error={errors.name}
                  {...register("name")}
                />
                <Input
                  type="email"
                  label="E-mail"
                  error={errors.email}
                  {...register("email")}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input
                  type="password"
                  label="Password"
                  error={errors.password}
                  {...register("password")}
                />
                <Input
                  type="password"
                  label="Password Confirmation"
                  error={errors.password_confirmation}
                  {...register("password_confirmation")}
                />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link href="/admin/products" passHref legacyBehavior>
                  <Button as="a" type="submit" colorScheme="whiteAlpha">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  colorScheme="pink"
                  isLoading={isSubmitting}
                >
                  Confirm
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany();

  const data = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: "admin",
      createdAt: user.createdAt.toISOString(),
    };
  });

  return {
    props: {
      users: data,
    },
  };
};
