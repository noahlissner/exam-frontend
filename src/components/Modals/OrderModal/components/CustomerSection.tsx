import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { IOrderCustomer } from "../../../../routes/Admin/Orders/types";

type Props = {
  customer: IOrderCustomer;
};

const CustomerSection = ({ customer }: Props) => {
  return (
    <Flex direction="column" gap={3} w="full">
      <VStack alignItems="flex-start">
        <Text>Name</Text>
        <Text w="full" border="1px" p="2" rounded="4" borderColor="gray.200">
          {customer.name}
        </Text>
      </VStack>
      <VStack alignItems="flex-start">
        <Text>Email</Text>
        <Text w="full" border="1px" p="2" rounded="4" borderColor="gray.200">
          {customer.email}
        </Text>
      </VStack>
      <VStack alignItems="flex-start">
        <Text>Street</Text>
        <Text w="full" border="1px" p="2" rounded="4" borderColor="gray.200">
          {customer.street}
        </Text>
      </VStack>
      <HStack>
        <VStack alignItems="flex-start">
          <Text>Zip</Text>
          <Text border="1px" p="2" rounded="4" borderColor="gray.200">
            {customer.zip}
          </Text>
        </VStack>
        <VStack alignItems="flex-start">
          <Text>City</Text>
          <Text border="1px" p="2" rounded="4" borderColor="gray.200">
            {customer.city}
          </Text>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default CustomerSection;
