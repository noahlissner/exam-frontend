import NavigationWrapper from "../../../components/NavigationWrapper";
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
import { FiPlus, FiSearch } from "react-icons/fi";
import OrderTable from "../../../components/Tables/OrderTable";
import useOrders from "./hooks/useOrders";

const Orders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, isLoading } = useOrders();
  return (
    <NavigationWrapper>
      <Box p={8}>
        <Container p="0" maxW="6xl">
          <Box mb={4}>
            <Heading fontSize="2xl" mb={4}>
              Orders
            </Heading>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FiSearch color="gray" />}
              />
              <Input
                type="search"
                bg={useColorModeValue("white", "gray.800")}
                border="none"
                placeholder="Search Order..."
                maxW="xs"
                fontSize="sm"
              />
            </InputGroup>
          </Box>

          {/* Table */}
          {data ? <OrderTable orders={data} /> : <Spinner />}
        </Container>
      </Box>
    </NavigationWrapper>
  );
};

export default Orders;
