import {
  Box,
  Container,
  HStack,
  VStack,
  Text,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import NavigationWrapper from "../../../components/NavigationWrapper";
import { Link } from "react-router-dom";
import { FiSearch, FiPlus } from "react-icons/fi";
import ProductTable from "../../../components/Tables/ProductTable";
import useProducts from "./hooks/useProducts";
import axios from "axios";

const Products = () => {
  const { data, error, isLoading } = useProducts();

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
                as={Link}
                to="/admin/products/create"
                fontSize="sm"
              >
                Create
              </Button>
            </HStack>
          </Box>

          {/* Table */}
          {data ? <ProductTable products={data} /> : <Spinner />}
        </Container>
      </Box>
    </NavigationWrapper>
  );
};

export default Products;
