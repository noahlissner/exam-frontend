import {
  Badge,
  Box,
  Circle,
  Flex,
  Icon,
  Image,
  chakra,
  Tooltip,
  useColorModeValue,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../feature/cart/cartSlice";
import { IProducts } from "../../routes/Admin/Products/types";

type Props = {
  data: IProducts;
};

const ProductCard = ({ data }: Props) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddtoCart = () => {
    dispatch(addToCart(data));
    toast({
      title: `${data.title} added to cart`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
          src={data.img}
          fallbackSrc="https://via.placeholder.com/400"
          alt={`Picture of ${data.title}`}
          roundedTop="lg"
          height="382px"
          width="382px"
          objectFit="cover"
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
              {data.category.title}
            </Badge>
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
            >
              {data.title}
            </Box>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement="top"
              color="gray.800"
              fontSize="1.2em"
            >
              <Button variant="ghost" display="flex" onClick={handleAddtoCart}>
                <Icon as={FiShoppingCart} h={7} w={7} alignSelf="center" />
              </Button>
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box
                as="span"
                color={useColorModeValue("gray.600", "gray.400")}
                fontSize="lg"
                mr="1"
              >
                SEK
              </Box>
              {data.price.toFixed(2)}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default ProductCard;
