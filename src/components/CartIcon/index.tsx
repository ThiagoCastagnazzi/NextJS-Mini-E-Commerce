import { Link, Text } from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../../hooks/useCart";

export default function CartIcon() {
  const { cart } = useCart();

  const cartSize = cart.reduce((sumAmount, product) => {
    sumAmount += product.amount;
    return sumAmount;
  }, 0);
  return (
    <Link
      href="/cart"
      color="gray.300"
      fontSize="small"
      fontWeight="bold"
      position="relative"
    >
      <AiOutlineShoppingCart size={36} color="#FFF" />
      {cartSize > 0 && (
        <Text
          as="span"
          position="absolute"
          top="0"
          right="0"
          transform="translate(50%, -50%)"
          bg="pink.500"
          w="18px"
          h="18px"
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="small"
          fontWeight="bold"
          color="white"
        >
          {cartSize}
        </Text>
      )}
    </Link>
  );
}
