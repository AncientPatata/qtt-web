import { Box } from "@chakra-ui/react";

// TODO :  On click this will transform into a box menu thing with options like "Sign Out" and "Settings" ?

function UserPill({ userName }) {
  return (
    <Box
      width="fit-content"
      bgColor="#474350"
      border="none"
      borderRadius="200px"
      pl="45px"
      pr="45px"
      pt="15px"
      pb="15px"
      color="white"
      fontFamily="heading"
      fontWeight="hairline"
      userSelect="none"
    >
      {userName ? userName : "User (No name)"}
    </Box>
  );
}

export { UserPill };
