import { Link, useColorModeValue } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

type Props = {
  children: JSX.Element | JSX.Element[] | string | string[];
};

const NavLink = ({ children }: Props) => {
  return (
    <Link
      as={ReactLink}
      to="#"
      px={2}
      py={2}
      fontSize="lg"
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
