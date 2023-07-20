import { Flex } from "@chakra-ui/react";
import { collection, getFirestore } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { DataTable } from "./DataTable";
import { createColumnHelper } from "@tanstack/react-table";

import { motion } from "framer-motion";

import useSWR from "swr";
import { fetch_table } from "../../lib/db_fetcher";
import supabase from "../../lib/supabase";
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor((row) => row.Items.item_name, {
    cell: (info) => info.getValue(),
    header: "Name of the item",
  }),
  columnHelper.accessor("lot", {
    cell: (info) => info.getValue(),
    header: "LOT",
  }),
  columnHelper.accessor("quantity", {
    cell: (info) => info.getValue(),
    header: "Updated Quantity",
  }),
  columnHelper.accessor((row) => row.created_at, {
    cell: (info) => info.getValue(),
    header: "Timestamp of the change",
    meta: {
      isNumeric: true,
    },
  }),
];

function IncrementalStockHistory(props) {
  // Only get last N items
  const { data, isLoading, error } = useSWR("ItemInstances", (table) => {
    return supabase
      .from(table)
      .select("*, Items(item_name)")
      .order("created_at", { ascending: false })
      .limit(15)
      .then((res) => res.data);
  });
  console.log("DATA-> : ", data);
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
        {data && <DataTable data={data} columns={columns} />}
      </Flex>
    </motion.div>
  );
}

export default IncrementalStockHistory;
