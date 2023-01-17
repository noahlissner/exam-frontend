import { Box, Flex, Img, Text, chakra } from "@chakra-ui/react";
import { IOrderProduct } from "../../../../routes/Admin/Orders/types";

type Props = {
  product: IOrderProduct;
};

const ProductsSectionCard = ({ product }: Props) => {
  return (
    <Box borderRadius="md" overflow="hidden" bg="gray.50">
      <Img src={product.img} width="250px" height="200px" objectFit="cover" />
      <Flex direction="column" p="2" gap="2">
        <Text color="gray.600">
          Title:
          <chakra.span fontSize="lg" ml="2" color="black">
            {product.title}
          </chakra.span>
        </Text>
        <Text color="gray.600">
          Price:
          <chakra.span fontSize="lg" ml="2" color="black">
            {product.price}:-
          </chakra.span>
        </Text>
      </Flex>
    </Box>
  );
};

export default ProductsSectionCard;
