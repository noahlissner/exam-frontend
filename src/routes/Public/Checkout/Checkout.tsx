import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import CartItem from "../../../components/Drawers/CartDrawer/CartItem";
import Nav from "../../../components/Nav";
import * as Yup from "yup";
import { clearCart } from "../../../feature/cart/cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state: RootState) => state.cart
  );
  const navigate = useNavigate();

  const CheckoutSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short")
      .max(50, "Too Long")
      .required("Required"),
    street: Yup.string()
      .min(2, "Too Short")
      .max(50, "Too Long")
      .required("Required"),
    zip: Yup.number().required("Required"),
    city: Yup.string()
      .min(2, "Too Short")
      .max(50, "Too Long")
      .required("Required"),
    email: Yup.string()
      .email("Please provide a valid email")
      .required("Required"),
  });

  useEffect(() => {
    if (cartTotalQuantity < 1) {
      navigate("/");
    }
  }, [cartTotalQuantity]);

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
          validationSchema={CheckoutSchema}
          onSubmit={(values) => {
            const data = {
              name: values.name,
              email: values.email,
              street: values.street,
              zip: values.zip,
              city: values.city,
              payment: values.payment,
              shipping: values.shipping,
              products: cartItems.map((item) => item._id),
              amount: cartTotalAmount,
            };

            axios
              .post(
                "https://exam-backend-production.up.railway.app/api/checkout",
                data
              )
              .then((response) => {
                if (response.status === 200) {
                  navigate("/confirmation/" + response.data);
                }
              })
              .catch((error) => {
                console.log(error);
              });
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
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection={[null, null, "column", "row"]}>
                <Box p={16} flex={{ base: 1.5, xl: 1 }}>
                  <Text fontSize="xl" fontWeight="bold" mb={10}>
                    Shipping Information
                  </Text>
                  <VStack gap="16px">
                    {/* Full name */}
                    <FormControl isInvalid={!!errors.name && touched.name}>
                      <FormLabel htmlFor="name">Full name</FormLabel>
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your first and last name"
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                    {/* Street address */}
                    <FormControl isInvalid={!!errors.street && touched.street}>
                      <FormLabel htmlFor="street">Street address</FormLabel>
                      <Field
                        as={Input}
                        id="street"
                        name="street"
                        type="text"
                        placeholder="123 Example Street"
                      />
                      <FormErrorMessage>{errors.street}</FormErrorMessage>
                    </FormControl>
                    {/* Zip & City */}
                    <Flex gap="16px" w="full">
                      <FormControl
                        flex="1"
                        isInvalid={!!errors.zip && touched.zip}
                      >
                        <FormLabel htmlFor="zip">Zip Code</FormLabel>
                        <Field
                          as={Input}
                          id="zip"
                          name="zip"
                          type="number"
                          placeholder="Zip Code"
                        />
                        <FormErrorMessage>{errors.zip}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        flex="3"
                        isInvalid={!!errors.city && touched.city}
                      >
                        <FormLabel htmlFor="city">City</FormLabel>
                        <Field
                          as={Input}
                          id="city"
                          name="city"
                          type="text"
                          placeholder="City"
                        />
                        <FormErrorMessage>{errors.city}</FormErrorMessage>
                      </FormControl>
                    </Flex>
                    {/* Email adress */}
                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
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
                    <RadioGroup
                      onChange={(e: any) => setFieldValue("payment", e)}
                      name="payment"
                      w="full"
                      mb="8px"
                    >
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
                <Box
                  p={16}
                  flex={1}
                  bg={useColorModeValue("gray.50", "gray.700")}
                  rounded="2xl"
                >
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
                        bg={useColorModeValue("white", "gray.800")}
                        _hover={{ bg: useColorModeValue("white", "gray.900") }}
                        _focus={{ bg: useColorModeValue("white", "gray.900") }}
                        size="lg"
                        border="1px"
                        borderColor={useColorModeValue(
                          "gray.100",
                          "transparent"
                        )}
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
                      <HStack
                        hidden={values.shipping.length < 1}
                        w="full"
                        justify="space-between"
                      >
                        <Text>Shipping Cost</Text>
                        <Text>
                          +
                          {values.shipping.length > 1
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
                        <Text>
                          {values.shipping.length > 1
                            ? values.shipping === "express"
                              ? cartTotalAmount + 149
                              : cartTotalAmount + 49
                            : cartTotalAmount}
                          :-
                        </Text>
                      </HStack>
                    </VStack>
                    <Button
                      type="submit"
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
