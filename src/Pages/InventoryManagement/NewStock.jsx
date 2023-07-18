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
import {
  collection,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { AddQuantityToItem } from "../../lib/item_management";
import { motion } from "framer-motion";
import { DataTable } from "../../Components/InventoryManagement/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import stringMath from "string-math";

function AddStockForm(props) {
  const { options, ...otherProps } = props;
  const [itemName, setItemName] = useState(null);
  const [quantity, setQuantity] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    AddQuantityToItem(itemName.value, itemName.label, stringMath(quantity));
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

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name of the item",
  }),
  columnHelper.accessor("deltaQuantity", {
    cell: (info) => info.getValue(),
    header: "Extra information / notes",
  }),
  columnHelper.accessor(
    (row) => new Date(row.changeTS.seconds * 1000).toUTCString(),
    {
      cell: (info) => info.getValue(),
      header: "Timestamp of the change",
      meta: {
        isNumeric: true,
      },
    }
  ),
];

function IncrementalStockHistory(props) {
  // Only get last N items
  const [value, loading, error] = useCollection(
    collection(getFirestore(), "items_incremental")
  );
  return (
    <motion.div
      animate={{ y: 20 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
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
      >
        {value && (
          <DataTable
            data={value.docs.map((doc) => doc.data())}
            columns={columns}
          />
        )}
      </Flex>
    </motion.div>
  );
}

function NewStock() {
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
          <AddStockForm
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
export default NewStock;
