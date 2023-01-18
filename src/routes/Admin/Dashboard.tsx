import { Flex, Text, VStack } from "@chakra-ui/react";
import NavigationWrapper from "../../components/NavigationWrapper/NavigationWrapper";

const Dashboard = () => {
  return (
    <NavigationWrapper>
      <Flex alignItems="center" justifyContent="center" mt="150px">
        <VStack>
          <Text fontSize="9xl">🏗️</Text>
          <Text fontSize="5xl">Under Construction</Text>
        </VStack>
      </Flex>
    </NavigationWrapper>
  );
};

export default Dashboard;
