import {
  Box,
  Container,
  HStack,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import NavigationWrapper from "../../../components/NavigationWrapper";
import { FiSearch, FiPlus } from "react-icons/fi";
import ProductTable from "../../../components/Tables/ProductTable";
import useProducts from "./hooks/useProducts";
import ProductDrawer from "../../../components/Drawers/ProductDrawer";
import { useEffect, useState } from "react";
import { IProducts } from "./types";

const Products = () => {
  const { data, error, isLoading } = useProducts();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <NavigationWrapper>
      <Box p={8}>
        <Container p="0" maxW="6xl">
          <Box mb={4}>
            <Heading fontSize="2xl" mb={4}>
              Products
            </Heading>
            <HStack>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiSearch color="gray" />}
                />
                <Input
                  type="search"
                  bg={useColorModeValue("white", "gray.800")}
                  border="none"
                  placeholder="Search Product..."
                  maxW="xs"
                  fontSize="sm"
                />
              </InputGroup>
              <Button
                leftIcon={<FiPlus />}
                bg="blue.400"
                _hover={{ bg: "blue.500" }}
                fontWeight="normal"
                color="white"
                fontSize="sm"
                onClick={onOpen}
              >
                Create
              </Button>
            </HStack>
          </Box>

          {/* Table */}
          {data ? <ProductTable products={data} /> : <Spinner />}
        </Container>
      </Box>
      <ProductDrawer isOpen={isOpen} onClose={onClose} title="Create Product" />
    </NavigationWrapper>
  );
};

export default Products;
