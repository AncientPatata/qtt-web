import { Box, Flex, Center } from "@chakra-ui/react";

function CriticalSupplyCard() {
  return (
    <Box height="100%" pt="10px">
      <Flex flexDir="column" height="300px">
        <Box
          rounded="3xl"
          height="100%"
          bgColor="#5299D3"
          borderRadius="3xl"
          borderBottomRadius="none"
          mb="12px"
        >
          {/* <Flex flexDir="column" height="100%">
            <Box
              width="100%"
              height="100px"
              bg="rgba(255, 255, 255, 0.27)"
              roundedTop="3xl"
              borderRadius="16px"
              boxShadow={"0 4px 30px rgba(0, 0, 0, 0.1)"}
              backdropFilter={"blur(3px)"}
              style={{ WebkitBackdropFilter: "blur(3px)" }}
              border="1px solid rgba(255, 255, 255, 0.3)"
            >
              <Flex flexDir="column" height="100%" p="13px">
                <Box fontSize="2xl" fontFamily="body">
                  Item name
                </Box>
                <Box fontSize="sm" fontFamily="body">
                  Item LOT
                </Box>
                <Box textAlign="right" fontWeight="bold" fontFamily="body">
                  2 Days left
                </Box>
              </Flex>
            </Box>
          </Flex> */}
          <Center height="100%">Nothing to show here..</Center>
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
            Items close to expiration date
          </Center>
        </Box>
      </Flex>
    </Box>
  );
}

export default CriticalSupplyCard;
