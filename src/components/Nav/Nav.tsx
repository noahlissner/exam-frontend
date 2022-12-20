import {
  Box,
  Button,
  Container,
  Flex,
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
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <FiX /> : <FiMenu />}
          aria-label={"Open Menu"}
          display={{ base: "flex", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Box>Logo</Box>
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
          <Button onClick={toggleColorMode} variant="ghost">
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
    </Box>
  );
};
export default Nav;
