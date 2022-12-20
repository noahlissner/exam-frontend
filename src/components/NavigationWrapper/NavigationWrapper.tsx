import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";

import { FiGrid, FiBox, FiTruck, FiUsers } from "react-icons/fi";
import { IconType } from "react-icons";
import SidebarContent from "./SidebarContent";
import MobileNav from "./MobileNav";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiGrid, href: "/admin" },
  { name: "Products", icon: FiBox, href: "/admin/products" },
  { name: "Orders", icon: FiTruck, href: "/admin/orders" },
  { name: "Customers", icon: FiUsers, href: "/admin/customers" },
];

const NavigationWrapper = ({ children }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        LinkItems={LinkItems}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent LinkItems={LinkItems} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  );
};

export default NavigationWrapper;
