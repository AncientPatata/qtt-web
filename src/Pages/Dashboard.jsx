import { Box, Button, Center, Divider, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserPill } from "../Components/UserPill";
import CriticalSupplyCard from "../Components/CriticalSupplyCard";
import AuthorCard from "../Components/AuthorCard";
import ManageCard from "../Components/ManageCard";

import supabase from "../lib/supabase";
import { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      setUser(data.session.user);
    });
  }, []);

  const navigate = useNavigate();
  const handleSignout = () => {
    supabase.auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <Box
      w="100vw"
      h="100vh"
      bgColor="#ffffee"
      padding="35px"
      fontFamily={"Roboto"}
    >
      <Flex height="fit-content" flexDir="row" ml="25px" mr="25px">
        <Box
          onClick={handleSignout}
          width="fit-content"
          bgColor="#474350"
          border="none"
          borderRadius="200px"
          pl="45px"
          pr="45px"
          pt="15px"
          pb="15px"
          color="white"
          fontWeight="hairline"
          userSelect="none"
          _hover={{
            cursor: "pointer",
            bgColor: "#F7AEF8",
            WebkitBoxShadow: "-13px -5px 50px 12px rgba(179,136,235,0.29)",
            boxShadow: "-13px -5px 50px 12px rgba(179,136,235,0.29)",
            color: "black",
          }}
        >
          Sign Out
        </Box>
        <Spacer />
        <UserPill userName={user?.email} />
      </Flex>
      <Flex
        margin="auto"
        justifyContent="center"
        padding="25px"
        flexWrap="wrap"
        flexDir="row"
        mt="50px"
        borderWidth="1px"
        borderColor="rgba(0,0,0,0.3)"
        rounded="3xl"
        bgColor={"rgba(0,0,0,0.1)"}
        gap="50px"
      >
        <CriticalSupplyCard />
        <AuthorCard />
        <ManageCard />
      </Flex>
    </Box>
  );
}

export default Dashboard;
