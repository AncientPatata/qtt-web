import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import useSWR from "swr";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import IncrementalStockHistory from "../../Components/InventoryManagement/IncrementalStockHistory";
import { fetch_table } from "../../lib/db_fetcher";
import supabase from "../../lib/supabase";
import { RemoveItemInstanceQuantities } from "../../lib/item_management";

// function StockEditElement(props) {
//   const { quantity, lot, expDate, itemId, ...otherProps } = props;
//   const [newQtt, setNewQtt] = useState(quantity);
//   const [waiting, setWaiting] = useState(false);
//   const handleApply = async () => {
//     setWaiting(true);
//     await ApplyQuantityModifToLot(itemId, quantity, newQtt, lot, expDate);
//     setWaiting(false);
//   };

//   return (
//     <Box>
//       {waiting ? (
//         <Center width="100%" height="100%">
//           {" "}
//           <Spinner />{" "}
//         </Center>
//       ) : (
//         <Flex flexDir="row" gap="80px">
//           <Button
//             height="90px"
//             margin="auto"
//             pl="20px"
//             pr="20px"
//             onClick={() => handleApply()}
//           >
//             Apply
//           </Button>
//           <Spacer />
//           <Flex flexDir="column" color="#FFFFEE">
//             <Box textAlign="right">{quantity}</Box>
//             <InputGroup>
//               <InputLeftElement>-</InputLeftElement>
//               <Input
//                 variant="flushed"
//                 onChange={(e) => setNewQtt(quantity - e.target.value)}
//               />
//             </InputGroup>
//             <Flex flexDir="row" mt="8px">
//               <Text fontSize="2xl" textAlign="left">
//                 {"="}
//               </Text>
//               <Spacer />
//               <Text textAlign="right">{newQtt}</Text>
//             </Flex>
//           </Flex>
//         </Flex>
//       )}
//     </Box>
//   );
// }

function ItemSelector(props) {
  const { itemId, ...otherProps } = props;

  const { data, isLoading, error, mutate } = useSWR(
    `ItemInstances/${itemId}`, //The error was also here ...
    (table) => {
      return supabase
        .from("ItemInstances")
        .select("expDate, lot,quantity")
        .eq("item_type", itemId)
        .then((res) => {
          console.log(res);
          return res.data;
        });
    }
  );
  const [updatedValues, setUpdatedValues] = useState([]);

  useEffect(() => {
    if (data) {
      console.log("DATA l", data);
      setUpdatedValues(data.map((v) => ({ ...v, new_quantity: v.quantity })));
    }
  }, [data]);
  return (
    <Box>
      {isLoading && <Spinner />}
      {data && (
        <Box>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Update item quantities</TableCaption>
              <Thead>
                <Tr>
                  <Th>Lot</Th>
                  <Th>Expiry Date</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th isNumeric>Substract</Th>
                  <Th isNumeric>New Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((row, i) => {
                  if (row.deleting) {
                    return (
                      <Tr key={i}>
                        <Box
                          bgColor="red"
                          color="white"
                          fontSize="2xl"
                          fontWeight="extrabold"
                        >
                          Deleting...
                        </Box>
                      </Tr>
                    );
                  }

                  return (
                    <Tr key={i}>
                      <Td>{row.lot}</Td>
                      <Td>{row.expDate}</Td>
                      <Td isNumeric>{row.quantity}</Td>
                      <Td isNumeric>
                        <Input
                          defaultValue={0}
                          onChange={(e) =>
                            setUpdatedValues(
                              updatedValues.map((v) => {
                                console.log(v);
                                if (
                                  v.lot === row.lot &&
                                  v.expDate === row.expDate
                                ) {
                                  return {
                                    ...v,
                                    new_quantity:
                                      v.quantity - e.target.value > 0
                                        ? v.quantity - e.target.value
                                        : 0,
                                  };
                                } else {
                                  return v;
                                }
                              })
                            )
                          }
                        />
                      </Td>
                      <Td isNumeric>
                        {updatedValues &&
                          updatedValues.filter(
                            (v) =>
                              v.lot === row.lot && v.expDate === row.expDate
                          )[0]?.new_quantity}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Lot</Th>
                  <Th>Expiry Date</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th isNumeric>Substract</Th>
                  <Th isNumeric>New Quantity</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      )}
      <Button
        type="submit"
        height="50px"
        bgColor="#38A3A5"
        color="white"
        _hover={{ color: "black", bgColor: "#F7AEF8" }}
        width="100%"
        onClick={
          () =>
            RemoveItemInstanceQuantities(itemId, updatedValues).then(() =>
              mutate(
                updatedValues
                  .filter((v) => v.new_quantity !== 0)
                  .map((v) => ({ ...v, quantity: v.new_quantity }))
              )
            )
          // mutate({
          //   optimisticData: updatedValues.map((v) => {
          //     if (v.new_quantity === 0) {
          //       return { ...v, quantity: 0, deleting: true };
          //     } else {
          //       return { ...v, quantity: v.new_quantity };
          //     }
          //   }),
          // })
        }
      >
        Remove{" "}
      </Button>
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
      {itemName?.value ? (
        <ItemSelector itemId={itemName.value} />
      ) : (
        <>Choose an item first </>
      )}
    </Flex>
  );
}

function RemoveStock() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useSWR("Items", fetch_table);
  console.log("DATA -QSD QSD : ", data);
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
        {isLoading && (
          <Center width="100%" height="100vh">
            <Spinner />
          </Center>
        )}
        {!isLoading && data && (
          <RemoveStockForm
            options={data.map((doc) => {
              if (doc && doc.item_name) {
                // Weird hack because of a weird fucking bug
                return {
                  label: doc.item_name,
                  value: doc.id,
                };
              }
            })}
          />
        )}
        <IncrementalStockHistory />
      </Flex>
    </Box>
  );
}
export default RemoveStock;
