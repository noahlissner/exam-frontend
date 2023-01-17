import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useCustomers from "../../../routes/Admin/Customers/hooks/useCustomers";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
};

const AlertDeleteCustomer = ({ isOpen, onClose, id }: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const { remove, error, isLoading } = useCustomers();

  const handleDelete = () => {
    console.log(id);

    if (id) {
      remove(id);
    }
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Customer
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertDeleteCustomer;
