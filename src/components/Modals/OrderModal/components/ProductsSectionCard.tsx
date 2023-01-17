import {
  Box,
  Flex,
  Img,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { IOrderProduct } from "../../../../routes/Admin/Orders/types";

type Props = {
  product: IOrderProduct;
};

const ProductsSectionCard = ({ product }: Props) => {
  return (
    <Box
      borderRadius="md"
      overflow="hidden"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Img src={product.img} width="250px" height="200px" objectFit="cover" />
      <Flex direction="column" p="2" gap="2">
        <Text color={useColorModeValue("gray.600", "gray.400")}>
          Title:
          <chakra.span
            fontSize="lg"
            ml="2"
            color={useColorModeValue("black", "white")}
          >
            {product.title}
          </chakra.span>
        </Text>
        <Text color={useColorModeValue("gray.600", "gray.400")}>
          Price:
          <chakra.span
            fontSize="lg"
            ml="2"
            color={useColorModeValue("black", "white")}
          >
            {product.price}:-
          </chakra.span>
        </Text>
      </Flex>
    </Box>
  );
};

export default ProductsSectionCard;
