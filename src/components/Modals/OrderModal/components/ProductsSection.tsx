import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { IOrderProduct } from "../../../../routes/Admin/Orders/types";
import ProductsSectionCard from "./ProductsSectionCard";

type Props = {
  products: IOrderProduct[];
};

const ProductsSection = ({ products }: Props) => {
  return (
    <Flex direction="column">
      <Text>Products</Text>
      <Flex gap="5" flexWrap="wrap">
        {products.map((product) => (
          <ProductsSectionCard key={product._id} product={product} />
        ))}
      </Flex>
    </Flex>
  );
};

export default ProductsSection;
