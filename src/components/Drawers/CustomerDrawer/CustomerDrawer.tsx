import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React from "react";
import useCustomers from "../../../routes/Admin/Customers/hooks/useCustomers";
import { ICustomer } from "../../../routes/Admin/Customers/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  customer?: ICustomer;
};

const CustomerDrawer = ({ isOpen, onClose, title, customer }: Props) => {
  const { create, update, error, isLoading } = useCustomers();
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
                  bg={useColorModeValue("white", "gray.800")}
                  spacing={4}
                  p={8}
                  rounded="lg"
                >
                  {/* Name */}
                  <FormControl>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Field as={Input} id="name" name="name" type="text" />
                  </FormControl>
                  {/* Email */}
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field as={Input} id="email" name="email" type="email" />
                  </FormControl>
                  {/* Street */}
                  <FormControl>
                    <FormLabel htmlFor="street">Street</FormLabel>
                    <Field as={Input} id="street" name="street" type="text" />
                  </FormControl>
                  {/* Zip */}
                  <FormControl>
                    <FormLabel htmlFor="zip">Zip</FormLabel>
                    <Field as={Input} id="zip" name="zip" type="number" />
                  </FormControl>
                  {/* City */}
                  <FormControl>
                    <FormLabel htmlFor="city">City</FormLabel>
                    <Field as={Input} id="city" name="city" type="text" />
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
