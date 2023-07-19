import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  browserLocalPersistence,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../lib/firebase";
import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    getAuth()
      .setPersistence(browserLocalPersistence)
      .then(() => {
        signInWithEmailAndPassword(getAuth(app), email, password)
          .then((userCred) => {
            console.log("USER CRED, ", userCred);
          })
          .catch((error) => {
            console.log("ERROR : ", error);
          });
      });
  };
  if (isLoading) {
    return <Spinner position="absolute" top="50%" left="50%" color="#B08EA2" />; // TODO : Put this in a better place (instead of form maybe...)
  }
  return (
    <Box w="100vw" h="100vh" bgColor="#ffffee" padding="140px">
      <Flex width="100%" height="100%" flexDir="row">
        <Flex flexDir="column" padding="25px" width="50%" justify="center">
          <Text color="#4a7289" fontSize={"4xl"} fontStyle="italic" mb="20px">
            Qtt
          </Text>
          <Text color="#4a7289" fontSize={"2xl"}>
            A <u>simple</u> and <u>secure</u> inventory management for small
            businesses
          </Text>
        </Flex>
        <Box
          bgColor="#faffee"
          margin="auto"
          width="20%"
          rounded="md"
          borderWidth="1px"
          borderColor="#B08EA2"
          _hover={{ borderColor: "#6F8F72" }}
        >
          <form onSubmit={(e) => handleLogin(e)}>
            <Flex
              height="100%"
              width="100%"
              flexDir="column"
              padding="20px"
              margin="auto"
              gap="25px"
            >
              <FormControl>
                <Input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  borderColor="#B08EA2"
                  _hover={{ borderColor: "#6F8F72" }}
                />
              </FormControl>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  borderColor="#B08EA2"
                  _hover={{ borderColor: "#6F8F72" }}
                />
              </FormControl>
              <Button
                bgColor="#B08EA2"
                w="100%"
                color="white"
                fontSize="xl"
                _hover={{ bgColor: "#6F8F72" }}
                type="submit"
              >
                Login
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}

export default LoginPage;

/**
 *       <Box
        position="absolute"
        top="2.5vh"
        left="2.5vw"
        w="95vw"
        h="95vh"
        overflow="hidden"
        rounded="2px"
        boxShadow="5px 3px 30px black"
        borderRadius="10px"
        borderColor="black"
        bg="hsla(0,0%,100%,.3)"
      ></Box>
 */
