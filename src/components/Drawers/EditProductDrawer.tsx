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
  Input,
  Select,
  Switch,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import useCategory from "../../routes/Admin/Products/hooks/useCategory";
import useProducts from "../../routes/Admin/Products/hooks/useProducts";
import { IProducts } from "../../routes/Admin/Products/types";

type Props = {
  onClose: any;
  isOpen: any;
  title: string;
  product: IProducts;
};

const EditProductDrawer = ({ onClose, isOpen, title, product }: Props) => {
  const { data: categories } = useCategory();
  const { create, update } = useProducts();

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
                  category: product ? product.category.title : "",
                  price: product ? product.price : "",
                  img: product ? product.img : "",
                  published: product ? product.published : "",
                }}
                onSubmit={(values) => {
                  const data = {
                    title: values.title,
                    price: values.price,
                    img: values.img,
                    published: values.published,
                    category: categories.find(
                      (category: any) => values.category === category.title
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
                      {/* Image url */}
                      <FormControl>
                        <FormLabel htmlFor="img">Image URL</FormLabel>
                        <Field as={Input} id="img" name="img" type="text" />
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
                        <Field
                          as={Input}
                          id="price"
                          name="price"
                          type="number"
                        />
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

export default EditProductDrawer;
