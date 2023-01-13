import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCart } from "../../hooks/useCart";

export default function SubscribeButton({ totalPrice }) {
  const { data: session } = useSession();
  const { cart, clearCart } = useCart();

  const createCheckoutSession = async () => {
    axios
      .post("api/purchease/create", { cart, user: session.user.id, totalPrice })
      .then((res) => {
        window.location = res.data.sessionURL;
      })
      .catch((err) => console.log(err));

    clearCart();
  };

  return (
    <Button
      colorScheme="pink"
      maxW={100}
      mx="auto"
      onClick={createCheckoutSession}
    >
      Purchease
    </Button>
  );
}
