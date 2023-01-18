import {
  Box,
  Container,
  Flex,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import Nav from "../../../components/Nav";
import ProductCard from "../../../components/ProductCard";
import useProducts from "../../Admin/Products/hooks/useProducts";

const Store = () => {
  const { data: products } = useProducts();
  return (
    <>
      <Nav />
      <Container maxW="6xl" mt={10}>
        <HStack>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FiSearch color="gray" />}
            />
            <Input
              type="search"
              bg={useColorModeValue("gray.50", "gray.800")}
              border="none"
              placeholder="Search Product..."
              maxW="md"
              fontSize="sm"
            />
          </InputGroup>
          <Select maxW="3xs" defaultValue="date">
            <option value="date">Date</option>
            <option value="alphabet">A-Z</option>
          </Select>
        </HStack>
        <Flex gap={50} mt={5} flexWrap="wrap">
          {products?.map((data) => (
            <ProductCard key={data._id} data={data} />
          ))}
        </Flex>
      </Container>
    </>
  );
};
export default Store;
