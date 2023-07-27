import {
  Box,
  Center,
  Flex,
  IconButton,
  Input,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CreateItem from "../../Components/InventoryManagement/CreateItem";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getFirestore } from "firebase/firestore";
import app from "../../lib/supabase";
import { DataTable } from "../../Components/InventoryManagement/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import useSWR, { mutate } from "swr";
import { fetch_table } from "../../lib/db_fetcher";
import supabase from "../../lib/supabase";
import { useState } from "react";
import { DownloadIcon } from "@chakra-ui/icons";
import { FromStorageGeneratePDF } from "../../lib/pdf_gen";

function DocGenHistory() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const { data, error, isLoading, mutate } = useSWR("Snapshots", () => {
    return supabase.storage
      .from("snapshots")
      .list("private", {
        sortBy: { column: "created_at", order: "desc" },
        search: searchText,
        limit: 25,
      })
      .then((res) => res.data)
      .then((data) => data.filter((e) => e.name !== ".emptyFolderPlaceholder"))
      .then((data) =>
        data.map((elem) => {
          let [name, type, _] = elem.name.split(".");
          return {
            snapshot_name:
              name.split("--")[0].replace(/[-]/g, "/") +
              "  " +
              name.split("--")[1].replace(/[-]/g, ":"),
            snapshot_type: type,
            created_at: elem.created_at,
            filepath: elem.name,
          };
        })
      ); // TODO : Later on add limits and search ..
  });

  const generateSnapshot = () => {
    supabase.functions.invoke("take-snapshot").then((res) => {
      console.log("TAKE SNAPSHOT RESPONSE : ", res);
      mutate();
    });
  };

  console.log(data);
  return (
    <Box
      w="100vw"
      minH="100vh"
      h="100%"
      bg="#FFFFEE"
      pt="50px"
      pl="25px"
      pr="25px"
    >
      <Flex flexDir="column" gap="20px">
        <Flex
          borderRadius="500px"
          w="calc(100% -50px)"
          height="85px"
          align="center"
          borderColor="#474350"
          borderWidth="1px"
          flexDir="row"
          p="5px"
        >
          <Box
            borderRadius="100%"
            minW="75px"
            maxW="120px"
            textDecoration="none"
            bg="#474350"
            color="white"
            p="0"
            textAlign="center"
            display="inline-block"
            borderStyle="none"
            overflow="none"
            fontSize="lg"
            onClick={() => navigate("/")}
            height="fit-content"
            _hover={{ cursor: "pointer", bgColor: "#F7AEF8", color: "black" }}
            _before={{
              content: '""',
              display: "inline-block",
              verticalAlign: "middle",
              paddingTop: "100%",
            }}
          >
            <Box display="inline-block" verticalAlign="middle" maxW="90%">
              back
            </Box>
          </Box>

          <Flex
            flexDir="row"
            ml="auto"
            mr="auto"
            width="70%"
            height="90%"
            as={"form"}
            onSubmit={(e) => {
              e.preventDefault();

              return mutate();
            }}
          >
            <Input
              borderLeftRadius="500px"
              borderColor="#474350"
              ringColor="#474350"
              height="100%"
              color="#474350"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Box
              borderRightRadius="500px"
              bg="#474350"
              color="white"
              pl="30px"
              pr="30px"
              height="100%"
              fontSize="xl"
              type="submit"
            >
              <Center width="100%" height="100%">
                Search
              </Center>
            </Box>
          </Flex>
          <Box
            borderRadius="100%"
            minW="75px"
            maxW="120px"
            textDecoration="none"
            bg="#474350"
            color="white"
            p="0"
            textAlign="center"
            display="inline-block"
            borderStyle="none"
            overflow="none"
            fontSize="lg"
            onClick={generateSnapshot}
            height="fit-content"
            _hover={{ cursor: "pointer", bgColor: "#F7AEF8", color: "black" }}
            _before={{
              content: '""',
              display: "inline-block",
              verticalAlign: "middle",
              paddingTop: "100%",
            }}
          >
            <Box display="inline-block" verticalAlign="middle" maxW="90%">
              Snap
            </Box>
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
          {!isLoading && (
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Snapshot Name</Th>
                    <Th>Snapshot Type</Th>
                    <Th>Snapshot Date</Th>
                    <Th>Generate PDF</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((item) => {
                    return (
                      <Tr key={item["id"]} _hover={{ bg: "rgba(0,0,0,0.1)" }}>
                        <Td>{item["snapshot_name"]}</Td>
                        <Td>{item["snapshot_type"]}</Td>
                        <Td>{item["created_at"]}</Td>
                        <Td>
                          {" "}
                          <IconButton
                            size="sm"
                            bg="#474350"
                            role="group"
                            icon={
                              <DownloadIcon
                                color="white"
                                _groupHover={{ color: "black" }}
                              />
                            }
                            _hover={{
                              bg: "#F7AEF8",
                              borderColor: "#B388EB",
                              border: "1px",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              FromStorageGeneratePDF(
                                `private/${item["filepath"]}`
                              );
                            }}
                          />
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default DocGenHistory;
