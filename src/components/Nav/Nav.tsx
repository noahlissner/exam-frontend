import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import NavLink from "./NavLink";

const Links = ["Store", "About", "Contact"];

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            {Links.map((link: any) => (
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
            {colorMode === "light" ? <FiMoon /> : <FiSun />}
          </Button>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link: any) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Container>
  );
};
export default Nav;
