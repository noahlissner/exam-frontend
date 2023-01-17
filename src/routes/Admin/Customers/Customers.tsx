import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FiPlus, FiSearch } from "react-icons/fi";
import CustomerDrawer from "../../../components/Drawers/CustomerDrawer";
import NavigationWrapper from "../../../components/NavigationWrapper";
import CustomerTable from "../../../components/Tables/CustomerTable";
import useCustomers from "./hooks/useCustomers";

const Customers = () => {
  const { data } = useCustomers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(data);

  return (
    <NavigationWrapper>
      <Box p={8}>
        <Container p="0" maxW="6xl">
          <Box mb={4}>
            <Heading fontSize="2xl" mb={4}>
              Customers
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
                  placeholder="Search Customer..."
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
          {data ? <CustomerTable customers={data} /> : <Spinner />}
        </Container>
      </Box>
      <CustomerDrawer
        isOpen={isOpen}
        onClose={onClose}
        title="Create Customer"
      />
    </NavigationWrapper>
  );
};

export default Customers;
