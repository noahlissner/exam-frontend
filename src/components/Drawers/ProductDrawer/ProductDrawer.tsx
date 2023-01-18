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
  Input,
  Select,
  Switch,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import useCategory from "../../../routes/Admin/Products/hooks/useCategory";
import useProducts from "../../../routes/Admin/Products/hooks/useProducts";
import { IProducts } from "../../../routes/Admin/Products/types";
import * as Yup from "yup";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  product?: IProducts;
};

const ProductDrawer = ({ onClose, isOpen, title, product }: Props) => {
  const { data: categories } = useCategory();
  const { create, update, isLoading, error } = useProducts();

  const ProductSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short")
      .max(50, "Too Long")
      .required("Required"),
    img: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
  });

  return (
    <>
      {categories && (
        <Drawer isOpen={isOpen} onClose={onClose} size="md">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{title}</DrawerHeader>
            <DrawerBody>
              <Formik
                initialValues={{
                  title: product ? product.title : "",
                  category: product ? product.category.title : "gadgets",
                  price: product ? product.price : 0,
                  img: product ? product.img : "",
                  published: product ? product.published : false,
                }}
                validationSchema={ProductSchema}
                onSubmit={(values) => {
                  const data = {
                    title: values.title,
                    price: values.price,
                    img: values.img,
                    published: values.published,
                    // @ts-ignore
                    category: categories.find(
                      (category) => values.category === category.title
                    )._id,
                  };

                  if (!product) {
                    create(data);
                  } else {
                    update({ ...data, _id: product._id });
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
                      {/* Title */}
                      <FormControl isInvalid={!!errors.title && touched.title}>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Field as={Input} id="title" name="title" type="text" />
                        <FormErrorMessage>{errors.title}</FormErrorMessage>
                      </FormControl>
                      {/* Image url */}
                      <FormControl isInvalid={!!errors.img && touched.img}>
                        <FormLabel htmlFor="img">Image URL</FormLabel>
                        <Field as={Input} id="img" name="img" type="text" />
                        <FormErrorMessage>{errors.img}</FormErrorMessage>
                      </FormControl>
                      {/* Category */}
                      <FormControl>
                        <FormLabel htmlFor="category">Category</FormLabel>
                        <Select
                          name="category"
                          value={values.category}
                          onChange={handleChange}
                        >
                          {categories.map((category) => (
                            <option key={category._id} value={category.title}>
                              {category.title.toUpperCase()}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                      {/* Price */}
                      <FormControl isInvalid={!!errors.price && touched.price}>
                        <FormLabel htmlFor="price">Price</FormLabel>
                        <Field
                          as={Input}
                          id="price"
                          name="price"
                          type="number"
                        />
                        <FormErrorMessage>{errors.price}</FormErrorMessage>
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
                      <Button
                        isLoading={isLoading}
                        loadingText="Save"
                        bg="blue.400"
                        fontWeight="normal"
                        color="white"
                        _hover={{ bg: "blue.500" }}
                        type="submit"
                      >
                        {product ? "Save" : "Create"}
                      </Button>
                    </VStack>
                  </form>
                )}
              </Formik>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default ProductDrawer;
