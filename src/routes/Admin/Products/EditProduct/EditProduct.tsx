import NavigationWrapper from "../../../../components/NavigationWrapper";
import { Link, useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  NumberInput,
  Select,
  Spinner,
  Switch,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik, useFormik } from "formik";
import useCategory from "../hooks/useCategory";

const EditProduct = () => {
  const { id } = useParams();
  const { data: products } = useProducts();
  const { data: categories } = useCategory();

  const product = products?.find((product) => product._id === id);

  return (
    <NavigationWrapper>
      {product && categories ? (
        <Box p={8}>
          <Container maxW="2xl">
            <VStack my={4} alignItems="flex-start">
              <Heading fontSize="2xl">Edit Product</Heading>
              <Text fontSize="lg" color="gray.500">
                #{id}
              </Text>
            </VStack>
            <Formik
              initialValues={{
                title: product.title,
                category: product.category.title,
                price: product.price,
                published: product.published,
              }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ handleSubmit, errors, touched, values, handleChange }) => (
                <form onSubmit={handleSubmit}>
                  <VStack
                    bg={useColorModeValue("white", "gray.800")}
                    spacing={4}
                    p={8}
                    rounded="lg"
                  >
                    {/* Title */}
                    <FormControl>
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <Field as={Input} id="title" name="title" type="text" />
                    </FormControl>
                    {/* Category */}
                    <FormControl>
                      <FormLabel htmlFor="category">Category</FormLabel>
                      <Select
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                      >
                        {categories.map((category: any) => (
                          <option key={category._id} value={category.title}>
                            {category.title.toUpperCase()}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    {/* Price */}
                    <FormControl>
                      <FormLabel htmlFor="price">Price</FormLabel>
                      <Field as={Input} id="price" name="price" type="number" />
                    </FormControl>
                    {/* Published */}
                    <FormControl>
                      <FormLabel htmlFor="published">Published</FormLabel>
                      <Field
                        as={Switch}
                        id="published"
                        name="published"
                        isChecked={values.published}
                      />
                    </FormControl>
                    <HStack>
                      <Button
                        as={Link}
                        to="/admin/products"
                        colorScheme="red"
                        fontWeight="normal"
                        color="white"
                        type="submit"
                      >
                        Cancel
                      </Button>
                      <Button
                        // isLoading={isLoading}
                        // loadingText="Sign in"
                        bg="blue.400"
                        fontWeight="normal"
                        color="white"
                        _hover={{ bg: "blue.500" }}
                        type="submit"
                      >
                        Save
                      </Button>
                    </HStack>
                  </VStack>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      ) : (
        <Spinner />
      )}
    </NavigationWrapper>
  );
};
export default EditProduct;
