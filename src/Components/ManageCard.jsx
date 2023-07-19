import { Box, Center, Divider, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ManageCard() {
  const navigate = useNavigate();
  return (
    <Box height="100%" pt="10px">
      <Box height="100%">
        <Flex flexDir="column" height="100%">
          <Box
            rounded="3xl"
            height="100%"
            bgColor="#6F8F72"
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
                onClick={() => navigate("/inventory/new_stock")}
              >
                Add items to inventory
              </Box>
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
                onClick={() => navigate("/inventory/remove_stock")}
              >
                Remove items from inventory
              </Box>
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
              >
                Browse inventory
              </Box>
            </Flex>
          </Box>
          <Box
            rounded="3xl"
            height="fit-content"
            pt="10px"
            pb="10px"
            bgColor="#6F8F72"
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
              Manage Inventory
            </Center>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default ManageCard;
