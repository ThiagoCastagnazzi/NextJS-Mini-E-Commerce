import {
  Box,
  Button,
  Flex,
  Img,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/format";
import SubscribeButton from "../PurcheaseButton";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  amount: number;
}

export default function CartItems() {
  const { cart, updateProductAmount, removeProduct, clearCart } = useCart();

  const cartFormatted = cart.map((product) => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount),
  }));

  const total = cart.reduce((sumTotal, product) => {
    sumTotal += product.price * product.amount;
    return sumTotal;
  }, 0);

  function handleProductIncrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount + 1 });
  }

  function handleProductDecrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount - 1 });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }
  return (
    <>
      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Product</Th>
            <Th>Quantity</Th>
            <Th>Subtotal</Th>
            <Th>Remove</Th>
          </Tr>
        </Thead>

        <Tbody>
          {cartFormatted?.map((product) => (
            <Tr key={product.id}>
              <Td>
                <Flex>
                  <Img
                    src={product.image}
                    alt={product.name}
                    mb="4"
                    borderRadius="full"
                    boxSize="50px"
                  />
                </Flex>
              </Td>
              <Td>
                <Text fontWeight="bold">{product.name}</Text>
              </Td>

              <Td>
                <Text>{product.amount}</Text>
              </Td>
              <Td>
                <Text>
                  {product.amount > 1
                    ? formatPrice(product.price * product.amount)
                    : product.priceFormatted}
                </Text>
              </Td>
              <Td>
                <Flex justify="space-between">
                  <Button
                    colorScheme="red"
                    onClick={() => handleProductIncrement(product)}
                  >
                    +
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleProductDecrement(product)}
                  >
                    -
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    Remove
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box>
        <Text fontSize="2xl" fontWeight="bold" color="white" mt="8">
          Total: {total}
        </Text>
      </Box>

      <Box mt="8">
        <SubscribeButton totalPrice={total} />
        <Button colorScheme="red" mx="auto" onClick={clearCart} ml="10">
          Clear Cart
        </Button>
      </Box>
    </>
  );
}
