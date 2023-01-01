import {
  Button,
  Flex,
  Image,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setCartAmount, removeFromCart } from "../../../feature/cart/cartSlice";
import { ICartItem } from "./types";

type Props = {
  item: ICartItem;
};

const CartItem = ({ item }: Props) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item));
  };

  const handleUpdateCartQuantity = (value: string) => {
    const data = {
      _id: item._id,
      amount: parseInt(value),
    };
    dispatch(setCartAmount(data));
  };

  return (
    <Flex>
      <Image
        src={item?.img}
        w="120px"
        h="120px"
        objectFit="cover"
        rounded="md"
        mr="5"
      />
      <Flex direction="column" flex="1" justify="space-between" py="2">
        <Flex justify="space-between" fontSize="lg">
          <Text>{item?.title}</Text>
          <Text>{item?.price}:-</Text>
        </Flex>
        <Flex justify="space-between" alignItems="center">
          <NumberInput
            size="md"
            maxW={24}
            defaultValue={1}
            min={1}
            value={item.cartQuantity}
            onChange={(value) => handleUpdateCartQuantity(value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button
            variant="link"
            colorScheme="red"
            fontWeight="medium"
            fontSize="md"
            onClick={handleRemoveFromCart}
          >
            Remove
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartItem;
