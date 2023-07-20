import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import useSWR from "swr";
import { useEffect, useState } from "react";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import {
  AddQuantityToItem,
  ApplyQuantityModifToLot,
} from "../../lib/item_management";
import { motion } from "framer-motion";
import { DataTable } from "../../Components/InventoryManagement/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import stringMath from "string-math";
import IncrementalStockHistory from "../../Components/InventoryManagement/IncrementalStockHistory";

function StockEditElement(props) {
  const { quantity, lot, expDate, itemId, ...otherProps } = props;
  const [newQtt, setNewQtt] = useState(quantity);
  const [waiting, setWaiting] = useState(false);
  const handleApply = async () => {
    setWaiting(true);
    await ApplyQuantityModifToLot(itemId, quantity, newQtt, lot, expDate);
    setWaiting(false);
  };

  return (
    <Box>
      {waiting ? (
        <Center width="100%" height="100%">
          {" "}
          <Spinner />{" "}
        </Center>
      ) : (
        <Flex flexDir="row" gap="80px">
          <Button
            height="90px"
            margin="auto"
            pl="20px"
            pr="20px"
            onClick={() => handleApply()}
          >
            Apply
          </Button>
          <Spacer />
          <Flex flexDir="column" color="#FFFFEE">
            <Box textAlign="right">{quantity}</Box>
            <InputGroup>
              <InputLeftElement>-</InputLeftElement>
              <Input
                variant="flushed"
                onChange={(e) => setNewQtt(quantity - e.target.value)}
              />
            </InputGroup>
            <Flex flexDir="row" mt="8px">
              <Text fontSize="2xl" textAlign="left">
                {"="}
              </Text>
              <Spacer />
              <Text textAlign="right">{newQtt}</Text>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Box>
  );
}

function ItemSelector(props) {
  const { itemId, ...otherProps } = props;
  const [globalQtt, setGlobalQtt] = useState(0);
  const [itemsList, setItemList] = useState([]);
  const [isUniqueItem, setIsUniqueItem] = useState(false);
  const [value, loading, error] = useCollection(
    collection(getFirestore(), "items/" + itemId + "/lots")
  );
  const [value_i, loading_i, error_i] = useDocument(
    doc(getFirestore(), "items/" + itemId)
  ); // We do this to force a refresh of the page when we modify non lot items
  useEffect(() => {
    if (!loading && !error) {
      if (value.empty) {
        setIsUniqueItem(true);

        getDoc(doc(getFirestore(), "items/" + itemId)).then((doc) => {
          setItemList([
            { ...doc.data(), lot: doc.data().name, name: doc.data().name },
          ]);
          setGlobalQtt(doc.data().quantity);
        });
      } else {
        let totalQtt = 0;
        let listOfItems = [];
        value.docs.forEach((doc) => {
          totalQtt += doc.data().quantity;
          listOfItems.push({ ...doc.data(), lot: doc.id, name: "" });
        });
        setIsUniqueItem(false);
        setGlobalQtt(totalQtt);
        setItemList(listOfItems);
      }
    }
  }, [value, value_i]);

  console.log("ITEMS LIST : ", itemsList);
  return (
    <Box>
      {loading || loading_i ? (
        <Spinner />
      ) : (
        <Flex flexDir="column" width="100%">
          <Box textAlign="center" fontSize="xl" bg="gray.200" padding="20px">
            Total quantity of item : {globalQtt}{" "}
          </Box>

          {itemsList.map((item, i) => (
            <Box>
              <Box
                textAlign="center"
                fontSize="xl"
                bg="gray.400"
                padding="10px"
              >
                {item.lot}
              </Box>
              <Accordion allowMultiple>
                {item.expDates.map((expDate, j) => {
                  return (
                    <AccordionItem>
                      <h2>
                        <AccordionButton
                          bg="#474350"
                          _hover={{ bg: "#8093F1" }}
                          _expanded={{ bg: "#8093F1" }}
                        >
                          <Box flex="1" textAlign="center">
                            <Flex flexDir="row" gap="80px">
                              <Box color="#FFFFEE">
                                Expiration Date : {expDate.expDate}
                              </Box>
                              <Box color="#FFFFEE">
                                Quantity : {expDate.quantity}
                              </Box>
                            </Flex>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel bg="#6f84ec">
                        <StockEditElement
                          quantity={expDate.quantity}
                          lot={item.name === item.lot ? null : item.lot}
                          expDate={expDate.expDate}
                          itemId={itemId}
                        />
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
}

function RemoveStockForm(props) {
  const { options, ...otherProps } = props;
  const [itemName, setItemName] = useState(null);

  console.log(options);
  return (
    <Flex
      flexDir="column"
      pl="80px"
      pr="80px"
      pt="80px"
      pb="80px"
      bgColor="rgba(0,0,0,0.1)"
      rounded="1.2em"
      borderWidth="1px"
      borderColor="black"
      gap="40px"
    >
      <FormControl>
        <FormLabel textAlign="center" fontSize="1.2em">
          Item name
        </FormLabel>
        <Select
          options={options}
          onChange={(e) => setItemName(e)}
          size="lg"
          chakraStyles={{
            inputContainer: (provided, state) => ({
              ...provided,
              textAlign: "center",
              height: "50px",
            }),
            container: (provided, state) => ({
              ...provided,
              borderRadius: "500px",
              variant: "filled",
            }),
          }}
          borderRadius="500px"
          variant="filled"
          height="50px"
          fontSize="2xl"
          textAlign="center"
        />
      </FormControl>
      {itemName?.value ? <ItemSelector itemId={itemName.value} /> : <></>}
      <Button
        type="submit"
        height="50px"
        bgColor="#38A3A5"
        color="white"
        _hover={{ color: "black", bgColor: "#F7AEF8" }}
      >
        Remove{" "}
      </Button>
    </Flex>
  );
}

function RemoveStock() {
  const navigate = useNavigate();
  const [value, loading, error] = useCollection(
    collection(getFirestore(), "items")
  );

  return (
    <Box h="100%" w="100vw" bg="#FFFFEE" p="50px">
      <Flex flexDir="column" gap="50px">
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
            fontFamily="'Roboto'"
            onClick={() => navigate("/")}
            _hover={{ cursor: "pointer", bgColor: "#F7AEF8", color: "black" }}
          >
            Back
          </Box>
        </Flex>
        {loading && (
          <Center width="100%" height="100vh">
            <Spinner />
          </Center>
        )}
        {value && (
          <RemoveStockForm
            options={value.docs.map((doc) => {
              return {
                label: doc.data()["name"],
                value: doc.id,
              };
            })}
          />
        )}
        <IncrementalStockHistory />
      </Flex>
    </Box>
  );
}
export default RemoveStock;
