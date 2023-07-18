import { Box, Flex, Center } from "@chakra-ui/react";

function CriticalSupplyCard() {
  return (
    <Box height="100%" pt="10px">
      <Flex flexDir="column" height="100%">
        <Box
          rounded="3xl"
          height="100%"
          bgColor="#5299D3"
          borderRadius="3xl"
          borderBottomRadius="none"
          mb="12px"
          _hover={{ borderWidth: "4px", borderColor: "#3581B8" }}
        >
          TODO
        </Box>
        <Box
          rounded="3xl"
          height="fit-content"
          pt="10px"
          pb="10px"
          bgColor="#3581B8"
          borderRadius="3xl"
          borderTopRadius="none"
          p="12px"
          pl="30px"
          pr="30px"
        >
          <Center
            color="white"
            fontSize="2xl"
            fontFamily="heading"
            fontWeight="200"
          >
            Items in critical supply
          </Center>
        </Box>
      </Flex>
    </Box>
  );
}

export default CriticalSupplyCard;
