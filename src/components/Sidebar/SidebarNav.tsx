import { Box, Stack, Text, Icon, Flex } from "@chakra-ui/react";
import { RiContactsLine } from "react-icons/ri";
import { FaProductHunt } from "react-icons/fa";
import { ActiveLink } from "../ActiveLink";
export default function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <Box>
        <Text fontWeight="bold" color="gray.400" fontSize="small">
          GERAL
        </Text>
        <Stack spacing="4" mt="8" align="stretch">
          <ActiveLink href="/admin/users">
            <Flex>
              <Icon as={RiContactsLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Users
              </Text>
            </Flex>
          </ActiveLink>
          <ActiveLink href="/admin/products">
            <Flex>
              <Icon as={FaProductHunt} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Products
              </Text>
            </Flex>
          </ActiveLink>
        </Stack>
      </Box>
    </Stack>
  );
}
