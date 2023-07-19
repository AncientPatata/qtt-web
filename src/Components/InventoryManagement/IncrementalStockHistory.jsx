import { Flex } from "@chakra-ui/react";
import { collection, getFirestore } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { DataTable } from "./DataTable";
import { createColumnHelper } from "@tanstack/react-table";

import { motion } from "framer-motion";

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

export default IncrementalStockHistory;
