import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";

import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { InstanciateItems } from "../../lib/item_management";
import { motion } from "framer-motion";
import { DataTable } from "../../Components/InventoryManagement/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import stringMath from "string-math";
import IncrementalStockHistory from "../../Components/InventoryManagement/IncrementalStockHistory";
import { fetch_table } from "../../lib/db_fetcher";
import useSWR from "swr";
function AddStockForm(props) {
  const { options, ...otherProps } = props;
  const [itemName, setItemName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [lot, setLot] = useState(null);
  const [expDate, setExpDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    InstanciateItems(itemName.value, stringMath(quantity), lot, expDate);
  };

  console.log(options);
  return (
    <form onSubmit={handleSubmit}>
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

        <FormControl>
          <FormLabel textAlign="center" fontSize="1.2em">
            Item Quantity
          </FormLabel>
          <Input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            rounded="none"
            variant="filled"
            height="55px"
            fontSize="2xl"
            textAlign="center"
          />
        </FormControl>
        <FormControl>
          <FormLabel textAlign="center" fontSize="1.2em">
            LOT
          </FormLabel>
          <Input
            value={lot}
            onChange={(e) => setLot(e.target.value)}
            rounded="none"
            variant="filled"
            height="55px"
            fontSize="2xl"
            textAlign="center"
          />
        </FormControl>
        <FormControl>
          <FormLabel textAlign="center" fontSize="1.2em">
            Expiration Date
          </FormLabel>
          <Input
            value={expDate}
            type="datetime-local"
            onChange={(e) => setExpDate(e.target.value)}
            rounded="none"
            variant="filled"
            height="55px"
            fontSize="2xl"
            textAlign="center"
          />
        </FormControl>
        <Button
          type="submit"
          height="50px"
          bgColor="#38A3A5"
          color="white"
          _hover={{ color: "black", bgColor: "#F7AEF8" }}
        >
          Add{" "}
        </Button>
      </Flex>
    </form>
  );
}

function NewStock() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useSWR("Items", fetch_table);
  console.log("DATAT TATA", data);
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
          <AddStockForm
            options={data.map((doc) => {
              return {
                label: doc["item_name"],
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
export default NewStock;
