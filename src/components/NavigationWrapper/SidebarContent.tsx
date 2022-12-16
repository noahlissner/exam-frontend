import {
  Box,
  Flex,
  Text,
  CloseButton,
  useColorModeValue,
  BoxProps,
} from "@chakra-ui/react";
import { LinkItemProps } from "./NavigationWrapper";
import NavItem from "./NavItem";

interface Props extends BoxProps {
  LinkItems?: Array<LinkItemProps>;
  onClose?: () => void;
}

const SidebarContent = ({ LinkItems, onClose, ...rest }: Props) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems?.map((link) => (
        <NavItem href={link.href} key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
