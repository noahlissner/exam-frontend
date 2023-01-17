import {
  ButtonGroup,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { ICustomer } from "../../../routes/Admin/Customers/types";
import AlertDeleteCustomer from "../../Alerts/AlertDeleteCustomer";
import CustomerDrawer from "../../Drawers/CustomerDrawer";

type Props = {
  customers: ICustomer[];
};

const CustomerTable = ({ customers }: Props) => {
  const [customerID, setCustomerID] = useState<string | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: AlertIsOpen,
    onOpen: AlertOnOpen,
    onClose: AlertOnClose,
  } = useDisclosure();
  const [customer, setCustomer] = useState<ICustomer | undefined>();

  const handleEdit = (customer: ICustomer) => {
    setCustomer(customer);
    onOpen();
  };

  const handleRemove = (id: string) => {
    setCustomerID(id);
    AlertOnOpen();
  };
  return (
    <>
      <TableContainer borderRadius="lg">
        <Table variant="simple">
          <Thead bg={useColorModeValue("gray.200", "gray.800")}>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Street</Th>
              <Th>Zip</Th>
              <Th>City</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody bg={useColorModeValue("white", "gray.700")}>
            {customers.map((customer) => {
              return (
                <Tr key={customer._id}>
                  <Td>{customer.name}</Td>
                  <Td>{customer.email}</Td>
                  <Td>{customer.street}</Td>
                  <Td>{customer.zip}</Td>
                  <Td>{customer.city}</Td>
                  <Td>
                    <ButtonGroup>
                      <IconButton
                        icon={<FiEdit2 />}
                        aria-label="edit"
                        onClick={() => handleEdit(customer)}
                      />
                      <IconButton
                        icon={<FiTrash />}
                        aria-label="delete"
                        onClick={() => handleRemove(customer._id)}
                      />
                    </ButtonGroup>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {customerID && (
        <AlertDeleteCustomer
          id={customerID}
          isOpen={AlertIsOpen}
          onClose={AlertOnClose}
        />
      )}
      {customer && (
        <>
          <CustomerDrawer
            customer={customer}
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Customer"
          />
        </>
      )}
    </>
  );
};

export default CustomerTable;
