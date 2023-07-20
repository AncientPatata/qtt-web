import { Box, Flex, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CreateItem from "../../Components/InventoryManagement/CreateItem";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getFirestore } from "firebase/firestore";
import app from "../../lib/supabase";
import { DataTable } from "../../Components/InventoryManagement/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import useSWR from "swr";
import { fetch_table } from "../../lib/db_fetcher";
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("item_name", {
    cell: (info) => info.getValue(),
    header: "Name of the item",
  }),
  columnHelper.accessor("extras", {
    cell: (info) => info.getValue(),
    header: "Extra information / notes",
  }),
  columnHelper.accessor("unit_price", {
    cell: (info) => info.getValue(),
    header: "Price of the item",
    meta: {
      isNumeric: true,
    },
  }),
];

function AuthorItems() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, isLoading } = useSWR("Items", fetch_table);
  console.log(data);
  return (
    <Box w="100vw" h="100vh" bg="#FFFFEE" pt="50px" pl="25px" pr="25px">
      <Flex flexDir="column" gap="20px">
        <Flex
          borderRadius="500px"
          w="calc(100% -50px)"
          borderColor="#474350"
          borderWidth="1px"
          flexDir="row"
          p="5px"
        >
          <Box
            borderRadius="500px"
            bg="#474350"
            color="white"
            p="20px"
            align="center"
            justifyContent="center"
            fontSize="xl"
            onClick={() => navigate("/")}
            _hover={{ cursor: "pointer", bgColor: "#F7AEF8", color: "black" }}
          >
            Back
          </Box>
          <Spacer />
          <Box
            borderRadius="500px"
            width="75px"
            bg="#474350"
            color="white"
            p="20px"
            align="center"
            justifyContent="center"
            fontSize="xl"
            onClick={onOpen}
          >
            +
          </Box>
        </Flex>
        <Box
          height="70%"
          padding="25px"
          flexDir="row"
          borderWidth="1px"
          borderColor="rgba(0,0,0,0.3)"
          rounded="3xl"
          bgColor={"rgba(0,0,0,0.1)"}
          gap="50px"
        >
          {!isLoading && <DataTable columns={columns} data={data} />}
        </Box>
      </Flex>
      <CreateItem isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default AuthorItems;
