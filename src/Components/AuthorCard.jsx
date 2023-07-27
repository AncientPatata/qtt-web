import { Box, Center, Divider, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function AuthorCard() {
  const navigate = useNavigate();
  return (
    <Box height="100%" pt="10px">
      <Box height="100%">
        <Flex flexDir="column" height="100%">
          <Box
            rounded="3xl"
            height="100%"
            bgColor="#B08EA2"
            borderRadius="3xl"
            borderBottomRadius="none"
            mb="12px"
          >
            <Flex flexDir="column" height="100%" gap="2px" mt="20px">
              <Box
                fontSize="xl"
                fontWeight="medium"
                color="#FFFFEE"
                padding="10px"
                pl="25px"
                pr="25px"
                bgColor="blackAlpha.100"
                _hover={{ bgColor: "blackAlpha.300", cursor: "pointer" }}
                align="center"
                onClick={() => navigate("/inventory/author")}
              >
                Manage inventory items
              </Box>
              {/* <Box
                fontSize="xl"
                fontWeight="medium"
                color="#FFFFEE"
                padding="10px"
                pl="25px"
                pr="25px"
                bgColor="blackAlpha.100"
                _hover={{ bgColor: "blackAlpha.300", cursor: "pointer" }}
                align="center"
              >
                Add new user to context
              </Box> */}
              {/* <Box
                fontSize="xl"
                fontWeight="medium"
                color="#FFFFEE"
                padding="10px"
                pl="25px"
                pr="25px"
                bgColor="blackAlpha.100"
                _hover={{ bgColor: "blackAlpha.300", cursor: "pointer" }}
                align="center"
              >
                Regenerate UPIN
              </Box> */}
              <Box
                fontSize="xl"
                fontWeight="medium"
                color="#FFFFEE"
                padding="10px"
                pl="25px"
                pr="25px"
                bgColor="blackAlpha.100"
                _hover={{ bgColor: "blackAlpha.300", cursor: "pointer" }}
                onClick={() => navigate("/snapshots/history")}
                align="center"
              >
                Author PDF Reports
              </Box>
            </Flex>
          </Box>
          <Box
            rounded="3xl"
            height="fit-content"
            pt="10px"
            pb="10px"
            bgColor="#B08EA2"
            borderRadius="3xl"
            borderTopRadius="none"
            p="12px"
            pl="30px"
            pr="30px"
          >
            <Center
              color="#FFFFEE"
              fontSize="2xl"
              fontFamily="heading"
              fontWeight="200"
            >
              Author inventory context
            </Center>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default AuthorCard;
