import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { getTotals } from "../../../feature/cart/cartSlice";
import CartItem from "./CartItem";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

const CartDrawer = ({ isOpen, onClose }: Props) => {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();

  dispatch(getTotals());

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Shopping Cart ({cartItems?.length} items)</DrawerHeader>
        <DrawerBody>
          <Flex justify="space-between" direction="column" h="full" py={5}>
            <Flex direction="column" gap={8}>
              {cartItems?.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </Flex>
            <Box>
              <Divider mb="10" />
              <Flex
                justify="space-between"
                color={useColorModeValue("gray.800", "white")}
                fontSize="2xl"
              >
                <Text>Subtotal:</Text>
                <Box>
                  <Box
                    as="span"
                    color={useColorModeValue("gray.600", "gray.400")}
                    fontSize="lg"
                    mr="1"
                  >
                    SEK
                  </Box>
                  {cartTotalAmount}
                </Box>
              </Flex>
              <Text color="gray.600" mt="2">
                Shipping + taxes calculated at checkout
              </Text>
              <Button
                as={ReactLink}
                to="/checkout"
                size="lg"
                w="full"
                colorScheme="blue"
                mt="10"
                fontWeight="normal"
              >
                Checkout
              </Button>
            </Box>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
