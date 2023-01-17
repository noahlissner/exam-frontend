import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Spinner,
  HStack,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Badge,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useOrders from "../../../routes/Admin/Orders/hooks/useOrders";
import { IOrder } from "../../../routes/Admin/Orders/types";
import CustomerSection from "./components/CustomerSection";
import ProductsSection from "./components/ProductsSection";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  order?: IOrder;
};

const OrderModal = ({ isOpen, onClose, order }: Props) => {
  const [status, setStatus] = useState<string | undefined>();
  const { update, error, isLoading } = useOrders();

  useEffect(() => {
    setStatus(order?.status);
  }, [order]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    update({ _id: order?._id, status });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Order Details</ModalHeader>
        <ModalCloseButton />
        {order ? (
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <ModalBody>
              <Flex direction="column" gap={5} alignItems="flex-start">
                <HStack gap={5}>
                  <Text>Order ID: {order._id}</Text>
                  <Text>
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </Text>
                </HStack>
                <HStack gap={5}>
                  <VStack>
                    <Text>Shipping</Text>
                    <Badge colorScheme="blue">{order.shipping}</Badge>
                  </VStack>
                  <VStack>
                    <Text>Payment</Text>
                    <Badge colorScheme="green">{order.payment}</Badge>
                  </VStack>
                  <Select
                    width="xs"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </Select>
                </HStack>
                <CustomerSection customer={order.customer} />
                <ProductsSection products={order.products} />
                <HStack fontSize="xl">
                  <Text>Total:</Text>
                  <Text>{order.amount}:-</Text>
                </HStack>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                fontWeight="normal"
                colorScheme="blue"
                mr={3}
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        ) : (
          <Spinner />
        )}
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;
