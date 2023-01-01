import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import CartItem from "../../../components/Drawers/CartDrawer/CartItem";
import Nav from "../../../components/Nav";

const Checkout = () => {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state: RootState) => state.cart
  );
  return (
    <>
      <Nav />
      <Container maxW="8xl" mt={10} p={0}>
        <Formik
          initialValues={{
            name: "",
            street: "",
            zip: "",
            city: "",
            email: "",
            shipping: "",
            payment: "",
            cardNumber: "",
            cardName: "",
            cardExpiryYear: "",
            cardExpiryMonth: "",
            cardCvc: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            handleSubmit,
            errors,
            touched,
            values,
            handleChange,
            setFieldValue,
          }) => (
            <form>
              <Box display="flex">
                <Box p={16} flex="1">
                  <Text fontSize="xl" fontWeight="bold" mb={10}>
                    Shipping Information
                  </Text>
                  <VStack gap="16px">
                    {/* Full name */}
                    <FormControl>
                      <FormLabel htmlFor="name">Full name</FormLabel>
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your first and last name"
                      />
                    </FormControl>
                    {/* Street address */}
                    <FormControl>
                      <FormLabel htmlFor="street">Street address</FormLabel>
                      <Field
                        as={Input}
                        id="street"
                        name="street"
                        type="text"
                        placeholder="123 Example Street"
                      />
                    </FormControl>
                    {/* Zip & City */}
                    <Flex gap="16px" w="full">
                      <FormControl flex="1">
                        <FormLabel htmlFor="zip">Zip Code</FormLabel>
                        <Field
                          as={Input}
                          id="zip"
                          name="zip"
                          type="number"
                          placeholder="Zip Code"
                        />
                      </FormControl>
                      <FormControl flex="3">
                        <FormLabel htmlFor="city">City</FormLabel>
                        <Field
                          as={Input}
                          id="city"
                          name="city"
                          type="text"
                          placeholder="City"
                        />
                      </FormControl>
                    </Flex>
                    {/* Email adress */}
                    <FormControl>
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                      />
                    </FormControl>
                  </VStack>
                  <Text fontSize="xl" fontWeight="bold" my={10}>
                    Shipping Method
                  </Text>
                  {/* Shipping method */}
                  <RadioGroup
                    name="shipping"
                    onChange={(e: any) => setFieldValue("shipping", e)}
                  >
                    <Stack direction="row" justify="space-between">
                      <Radio value="express">
                        <VStack align="flex-start" ml="2" spacing={0}>
                          <Text fontWeight="bold" fontSize="lg">
                            Express 149:-
                          </Text>
                          <Text>Dispatched in 24 hours</Text>
                        </VStack>
                      </Radio>
                      <Radio value="standard">
                        <VStack align="flex-start" ml="2" spacing={0}>
                          <Text fontWeight="bold" fontSize="lg">
                            Standard 49:-
                          </Text>
                          <Text>Dispatched in 1 - 2 days</Text>
                        </VStack>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <Text fontSize="xl" fontWeight="bold" my={10}>
                    Payment Information
                  </Text>
                  <VStack gap="16px">
                    {/* Payment method */}
                    <RadioGroup name="payment" w="full" mb="8px">
                      <Stack direction="row" justify="space-between">
                        <Radio value="credit-card">
                          <VStack align="flex-start" ml="2" spacing={0}>
                            <Text fontWeight="bold" fontSize="lg">
                              Credit Card
                            </Text>
                            <Text>Pay with credit card</Text>
                          </VStack>
                        </Radio>
                        <Radio value="paypal">
                          <VStack align="flex-start" ml="2" spacing={0}>
                            <Text fontWeight="bold" fontSize="lg">
                              PayPal
                            </Text>
                            <Text>Pay using PayPal account</Text>
                          </VStack>
                        </Radio>
                      </Stack>
                    </RadioGroup>
                    {/* Credit card number & card name */}
                    <Flex gap="16px" w="full">
                      <FormControl flex="1">
                        <FormLabel htmlFor="cardNumber">
                          Credit card number
                        </FormLabel>
                        <Field
                          as={Input}
                          id="cardNumber"
                          name="cardNumber"
                          type="number"
                          placeholder="Card number"
                        />
                      </FormControl>
                      <FormControl flex="1">
                        <FormLabel htmlFor="cardName">Name on card</FormLabel>
                        <Field
                          as={Input}
                          id="cardName"
                          name="cardName"
                          type="text"
                          placeholder="Card name"
                        />
                      </FormControl>
                    </Flex>
                    {/* Expiray date & CVV/CVC */}
                    <Flex gap="16px" w="full">
                      <Flex flex="1" gap="8px">
                        <FormControl flex="1">
                          <FormLabel htmlFor="cardExpiryMonth">
                            Expiry month
                          </FormLabel>
                          <Field
                            as={Input}
                            id="cardExpiryMonth"
                            name="cardExpiryMonth"
                            type="number"
                            placeholder="01"
                          />
                        </FormControl>
                        <FormControl flex="1">
                          <FormLabel htmlFor="cardExpiryMonth">
                            Expiry year
                          </FormLabel>
                          <Field
                            as={Input}
                            id="cardExpiryYear"
                            name="cardExpiryYear"
                            type="number"
                            placeholder="2022"
                          />
                        </FormControl>
                      </Flex>
                      <FormControl flex="1">
                        <FormLabel htmlFor="cardCvc">CVV/CVC</FormLabel>
                        <Field
                          as={Input}
                          id="cardCvc"
                          name="cardCvc"
                          type="text"
                          placeholder="CVC"
                        />
                      </FormControl>
                    </Flex>
                  </VStack>
                </Box>
                <Box p={16} flex="1" bg="gray.50">
                  <Text fontSize="xl" fontWeight="bold" mb={10}>
                    Order Summary
                  </Text>
                  <Flex direction="column" gap={8}>
                    {cartItems?.map((item) => (
                      <CartItem key={item._id} item={item} />
                    ))}
                  </Flex>
                  <Flex direction="column">
                    <HStack w="full" gap="24px" mt={8}>
                      <Input
                        type="text"
                        placeholder="Discount Code"
                        variant="filled"
                        bg="white"
                        _hover={{ bg: "white" }}
                        _focus={{ bg: "white" }}
                        size="lg"
                        border="1px"
                        borderColor="gray.100"
                      />
                      <Button
                        size="lg"
                        fontWeight="normal"
                        color="white"
                        bg="gray.500"
                        _hover={{ bg: "gray.600" }}
                        _active={{ bg: "gray.700" }}
                      >
                        Apply
                      </Button>
                    </HStack>
                    <VStack mt={8} gap={4}>
                      <HStack w="full" justify="space-between">
                        <Text>Subtotal</Text>
                        <Text>{cartTotalAmount}:-</Text>
                      </HStack>
                      <HStack w="full" justify="space-between">
                        <Text>Shipping Cost</Text>
                        <Text>
                          +
                          {values.shipping
                            ? values.shipping === "express"
                              ? "149"
                              : "49"
                            : "0"}
                          :-
                        </Text>
                      </HStack>
                      <Divider />
                      <HStack
                        w="full"
                        justify="space-between"
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        <Text>Order Total</Text>
                        <Text>{cartTotalAmount + 49}:-</Text>
                      </HStack>
                    </VStack>
                    <Button
                      size="lg"
                      fontWeight="normal"
                      colorScheme="blue"
                      mt={8}
                    >
                      Place Order
                    </Button>
                  </Flex>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Checkout;
