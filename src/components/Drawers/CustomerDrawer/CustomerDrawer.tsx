import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import useCustomers from "../../../routes/Admin/Customers/hooks/useCustomers";
import { ICustomer } from "../../../routes/Admin/Customers/types";
import * as Yup from "yup";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  customer?: ICustomer;
};

const CustomerDrawer = ({ isOpen, onClose, title, customer }: Props) => {
  const { create, update, error, isLoading } = useCustomers();

  const CustomerSchema = Yup.object().shape({
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

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody>
          <Formik
            initialValues={{
              name: customer ? customer.name : "",
              email: customer ? customer.email : "",
              street: customer ? customer.street : "",
              zip: customer ? customer.zip : "",
              city: customer ? customer.city : "",
            }}
            validationSchema={CustomerSchema}
            onSubmit={(values) => {
              const data = {
                name: values.name,
                email: values.email,
                street: values.street,
                zip: Number(values.zip),
                city: values.city,
              };

              if (!customer) {
                create(data);
              } else {
                update({ ...data, _id: customer._id });
              }
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
                <VStack
                  bg={useColorModeValue("white", "gray.700")}
                  spacing={4}
                  p={8}
                  rounded="lg"
                >
                  {/* Name */}
                  <FormControl isInvalid={!!errors.name && touched.name}>
                    <FormLabel htmlFor="name">Full Name</FormLabel>
                    <Field as={Input} id="name" name="name" type="text" />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                  {/* Email */}
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field as={Input} id="email" name="email" type="email" />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  {/* Street */}
                  <FormControl isInvalid={!!errors.street && touched.street}>
                    <FormLabel htmlFor="street">Street</FormLabel>
                    <Field as={Input} id="street" name="street" type="text" />
                    <FormErrorMessage>{errors.street}</FormErrorMessage>
                  </FormControl>
                  {/* Zip */}
                  <FormControl isInvalid={!!errors.zip && touched.zip}>
                    <FormLabel htmlFor="zip">Zip</FormLabel>
                    <Field as={Input} id="zip" name="zip" type="number" />
                    <FormErrorMessage>{errors.zip}</FormErrorMessage>
                  </FormControl>
                  {/* City */}
                  <FormControl isInvalid={!!errors.city && touched.city}>
                    <FormLabel htmlFor="city">City</FormLabel>
                    <Field as={Input} id="city" name="city" type="text" />
                    <FormErrorMessage>{errors.city}</FormErrorMessage>
                  </FormControl>
                  <Button
                    // isLoading={isLoading}
                    // loadingText="Save"
                    bg="blue.400"
                    fontWeight="normal"
                    color="white"
                    _hover={{ bg: "blue.500" }}
                    type="submit"
                  >
                    {customer ? "Save" : "Create"}
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomerDrawer;
