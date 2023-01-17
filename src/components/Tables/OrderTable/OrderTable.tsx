import {
  Badge,
  ButtonGroup,
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
import { useState } from "react";
import { IOrder } from "../../../routes/Admin/Orders/types";
import OrderModal from "../../Modals/OrderModal";
import getBadgeColor from "./utils/BadgeColor";

type Props = {
  orders: IOrder[];
};

const OrderTable = ({ orders }: Props) => {
  const [currentOrder, setCurrentOrder] = useState<IOrder>();
  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();

  const handleModal = (order: IOrder) => {
    setCurrentOrder(order);
    modalOnOpen();
  };
  return (
    <>
      <TableContainer borderRadius="lg">
        <Table variant="simple">
          <Thead bg={useColorModeValue("gray.200", "gray.800")}>
            <Tr>
              <Th>Order</Th>
              <Th>Payment</Th>
              <Th>Shipping</Th>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody bg={useColorModeValue("white", "gray.700")}>
            {orders.map((order) => {
              return (
                <Tr
                  key={order._id}
                  _hover={{ bg: "gray.50" }}
                  cursor="pointer"
                  onClick={() => handleModal(order)}
                >
                  <Td>#{order._id}</Td>
                  <Td>{order.payment.toUpperCase()}</Td>
                  <Td>{order.shipping.toUpperCase()}</Td>
                  <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
                  <Td>{order.amount}:-</Td>
                  <Td>
                    <Badge colorScheme={getBadgeColor(order.status)} p="1">
                      {order.status.toUpperCase()}
                    </Badge>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <OrderModal
        isOpen={modalIsOpen}
        onClose={modalOnClose}
        order={currentOrder}
      />
    </>
  );
};

export default OrderTable;
