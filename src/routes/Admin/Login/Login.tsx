import {
  Flex,
  Stack,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { useNavigate } from "react-router-dom";

// Redux
import { login, reset } from "../../../feature/auth/authSlice";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { AppDispatch, RootState } from "../../../app/store";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast({
        title: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    // if (isSuccess || user) {
    //   navigate("/admin");
    // }

    dispatch(reset());
  }, [user, isError, message, reset]);

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx="auto" width="full" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign in 🎉</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          p={8}
          boxShadow="lg"
        >
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={(values) => {
              dispatch(login(values));
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Field
                      as={Input}
                      id="username"
                      name="username"
                      type="text"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                    />
                  </FormControl>
                  <Button
                    isLoading={isLoading}
                    loadingText="Sign in"
                    bg="blue.400"
                    fontWeight="normal"
                    color="white"
                    _hover={{ bg: "blue.500" }}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
