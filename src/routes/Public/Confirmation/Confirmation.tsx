import {
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Img,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import Nav from "../../../components/Nav";
import { clearCart } from "../../../feature/cart/cartSlice";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface IOrderReview {
  date: Date;
  delivery: string;
  email: string;
  payment: string;
  total: string;
}

const Confirmation = () => {
  const [order, setOrder] = useState<IOrderReview>();
  const [run, setRun] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { width, height } = useWindowSize();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart(null));

    axios
      .get("http://localhost:5000/api/admin/orders/getorder/" + id)
      .then((response) => {
        setTimeout(() => {
          setOrder(response.data);
          setRun(true);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Nav />
      <Container maxW="3xl" mt={10}>
        <Confetti width={width} height={height} recycle={false} run={run} />
        <Flex alignItems="center" justifyContent="center" direction="column">
          {order ? (
            <>
              <Text fontSize="150px">🎉</Text>
              <Heading mb={8}>Thank you for your order.</Heading>

              <Text fontSize="md">ORDER DETAILS - {id}</Text>
              <Divider maxW="lg" my={5} />
              <Flex direction="column" gap={5} w="full">
                <HStack flexWrap="wrap">
                  <VStack flex={1} alignItems="flex-start">
                    <Text>Order total</Text>
                    <Text>{order.total}:-</Text>
                  </VStack>
                  <VStack flex={1} alignItems="flex-start">
                    <Text>Order date</Text>
                    <Text>{new Date(order.date).toLocaleDateString()}</Text>
                  </VStack>
                  <VStack flex={1} alignItems="flex-start">
                    <Text>Payment method</Text>
                    <Text>{order.payment.toUpperCase()}</Text>
                  </VStack>
                </HStack>
                <HStack flexWrap="wrap">
                  <VStack flex={1} alignItems="flex-start">
                    <Text>Email</Text>
                    <Text>{order.email}</Text>
                  </VStack>
                  <VStack flex={1} alignItems="flex-start">
                    <Text>Expected delivery</Text>
                    <Text>200:-</Text>
                  </VStack>
                  <VStack flex={1} alignItems="flex-start">
                    <Text>Delivery option</Text>
                    <Text>{order.delivery.toUpperCase()}</Text>
                  </VStack>
                </HStack>
              </Flex>
              <Button
                onClick={() => navigate("/")}
                colorScheme="blue"
                fontWeight="normal"
                mt="12"
              >
                Continue Shopping
              </Button>
            </>
          ) : (
            <Spinner />
          )}
        </Flex>
      </Container>
    </>
  );
};

export default Confirmation;
