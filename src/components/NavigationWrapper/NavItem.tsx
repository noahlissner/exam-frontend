import {
  Flex,
  Link,
  Icon,
  FlexProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Link as ReactLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string;
  href: string;
}

const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  const { pathname } = useLocation();
  const activePath = pathname.split("/")[2] === href.split("/")[2];

  const textStyle = activePath
    ? "white"
    : useColorModeValue("gray.800", "white");
  const bgStyle = activePath ? "blue.400" : "none";
  const hoverStyle = activePath
    ? "blue.400"
    : useColorModeValue("gray.100", "whiteAlpha.200");

  return (
    <Link
      as={ReactLink}
      to={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        cursor="pointer"
        _hover={{ bg: hoverStyle }}
        bg={bgStyle}
        color={textStyle}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{ color: "white" }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
