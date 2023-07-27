import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import supabase, { supabaseLocal } from "../lib/supabase";
import generatePDF, { FromStorageGeneratePDF } from "../lib/pdf_gen";

function Debug() {
  const [responseData, setResponseData] = useState("");
  const callCloudFunction = async (func_name, func_body) => {
    const { data, error } = await supabase.functions.invoke(func_name, {
      body: func_body,
    });
    console.log("DATA :  ", data);
    console.log("ERROR :  ", error);
    setResponseData(data.message);
  };

  return (
    <Box>
      {" "}
      <Button
        onClick={() => callCloudFunction("generate-pdf", { name: "bar" })}
      >
        Generate PDF
      </Button>
      <Button onClick={() => callCloudFunction("take-snapshot")}>
        Take Snapshot
      </Button>
      <Button onClick={() => generatePDF("nope")}>Test Generate PDF</Button>
      <Button
        onClick={() =>
          FromStorageGeneratePDF("private/26-07-2023--15-38-15.manual.delta")
        }
      >
        Test Generate pdf from storage
      </Button>
      <Box>{responseData}</Box>
    </Box>
  );
}

export default Debug;
