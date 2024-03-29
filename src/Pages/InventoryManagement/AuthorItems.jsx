import {
  Box,
  ButtonGroup,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useEditableControls,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CreateItem from "../../Components/InventoryManagement/CreateItem";

import useSWR from "swr";
import { fetch_table } from "../../lib/db_fetcher";
import supabase from "../../lib/supabase";
import { useState } from "react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        icon={<CheckIcon variant="outline" />}
        {...getSubmitButtonProps()}
      />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <IconButton
      size="sm"
      bg="#474350"
      role="group"
      icon={<EditIcon color="white" _groupHover={{ color: "black" }} />}
      _hover={{ bg: "#F7AEF8", borderColor: "#B388EB", border: "1px" }}
      {...getEditButtonProps()}
    />
  );
}

function AuthorItems() {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const {
  //   isOpen: isOpenEdit,
  //   onOpen: onOpenEdit,
  //   onClose: onCloseEdit,
  // } = useDisclosure();
  const [searchText, setSearchText] = useState("");
  const { data, error, isLoading, mutate } = useSWR("Items", () => {
    if (searchText === "") {
      return fetch_table("Items");
    } else {
      return supabase
        .from("Items")
        .select()
        .textSearch("item_name", searchText)
        .then((res) => res.data);
    }
  });
  return (
    <Box w="100%" h="100%" bg="#FFFFEE" pt="50px" pl="25px" pr="25px">
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
            fontSize="2xl"
            onClick={onOpen}
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
              +
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
                    <Th>Item name</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((item) => {
                    return (
                      <Tr key={item["id"]} _hover={{ bg: "rgba(0,0,0,0.1)" }}>
                        <Td>
                          {" "}
                          <Editable
                            defaultValue={item["item_name"]}
                            isPreviewFocusable={false}
                            onSubmit={(newValue) => {
                              supabase
                                .from("Items")
                                .update({ item_name: newValue })
                                .eq("id", item["id"])
                                .then(({ _, err }) => {
                                  if (err) {
                                    toast({
                                      title: "Item update failed.",
                                      description: `Failed to update the item ${item["item_name"]} to ${newValue}, please try again`,
                                      status: "error",
                                      duration: 5000,
                                      isClosable: true,
                                    });
                                  } else {
                                    toast({
                                      title: "Item update success.",
                                      description: `updated the item name ${item["item_name"]} to ${newValue} !`,
                                      status: "success",
                                      duration: 5000,
                                      isClosable: true,
                                    });
                                  }
                                });
                            }}
                          >
                            <Flex dir="row">
                              <EditablePreview />
                              {/* Here is the custom input */}
                              <Input as={EditableInput} />
                              <Spacer />
                              <EditableControls />
                            </Flex>
                          </Editable>
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
      <CreateItem isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default AuthorItems;
