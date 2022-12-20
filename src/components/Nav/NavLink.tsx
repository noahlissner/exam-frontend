import { Link, useColorModeValue } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const NavLink = ({ children }: Props) => {
  return (
    <Link
      as={ReactLink}
      to="#"
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Link>
  );
};

export default NavLink;
