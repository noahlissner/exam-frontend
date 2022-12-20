import {
  Box,
  FlexProps,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  IconButton,
  HStack,
  VStack,
  Avatar,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown, FiMoon, FiSun } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { logout } from "../../feature/auth/authSlice";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.800")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "4" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="toggle color mode"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
        />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              py={2}
              px={4}
              borderRadius="md"
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
              _hover={{ bg: useColorModeValue("gray.100", "whiteAlpha.200") }}
            >
              <HStack>
                <Avatar size="sm" name="Noah Lissner" />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="center"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Noah Lissner</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem
                bg={useColorModeValue("white", "gray.900")}
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              >
                Profile
              </MenuItem>
              <MenuItem
                bg={useColorModeValue("white", "gray.900")}
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              >
                Settings
              </MenuItem>
              <MenuItem
                bg={useColorModeValue("white", "gray.900")}
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              >
                Billing
              </MenuItem>
              <MenuDivider />
              <MenuItem
                bg={useColorModeValue("white", "gray.900")}
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                onClick={() => dispatch(logout())}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
