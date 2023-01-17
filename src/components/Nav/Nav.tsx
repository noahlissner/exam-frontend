import {
  Box,
  Button,
  Circle,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMoon, FiSun, FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import CartDrawer from "../Drawers/CartDrawer";
import NavLink from "./NavLink";

const Links = ["Store", "About", "Contact"];

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: CartIsOpen,
    onOpen: CartOnOpen,
    onClose: CartOnClose,
  } = useDisclosure();

  const { cartTotalQuantity } = useSelector((state: RootState) => state.cart);

  return (
    <Container maxW="8xl" borderRadius="xl" px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <FiX /> : <FiMenu />}
          aria-label={"Open Menu"}
          display={{ base: "flex", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Heading fontSize="2xl">Logo</Heading>
        <HStack
          spacing={8}
          alignItems={"center"}
          display={{ base: "none", md: "flex" }}
        >
          <HStack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Button
            onClick={toggleColorMode}
            variant="ghost"
            _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
          >
            {colorMode === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
          </Button>
          <Button
            onClick={CartOnOpen}
            variant="ghost"
            _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
          >
            <FiShoppingCart size={20} />
            <Circle
              mb="15px"
              ml="2px"
              size="20px"
              fontSize="10px"
              bg="black"
              color="white"
            >
              {cartTotalQuantity}
            </Circle>
          </Button>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}

      <CartDrawer isOpen={CartIsOpen} onClose={CartOnClose} />
    </Container>
  );
};
export default Nav;
