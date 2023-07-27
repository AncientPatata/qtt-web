import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import supabase from "./supabase";

function generatePDF(data) {
  const doc = new jsPDF();

  doc.text(
    `Rapport QTT (STYLING TODO :) ) - ${new Date().toLocaleDateString()}`,
    25,
    25
  );
  autoTable(doc, {
    head: [["Identification", "LOT", "Date d'expiration", "Quantité"]],
    body: data,
    startY: 30,
  });
  doc.save(`rapport_stock_${new Date().toLocaleDateString()}.pdf`);
}

export async function FromStorageGeneratePDF(filepath) {
  try {
    let { data, error } = await supabase.storage
      .from("snapshots")
      .download(filepath);
    if (error) throw error;
    const data_parsed = JSON.parse(await data.text());

    const data_cleaned = data_parsed.map((elem) => {
      const { item_name, lot, quantity, expDate, ...others } = elem;
      return [item_name, lot, expDate, quantity];
    });
    generatePDF(data_cleaned);
  } catch (e) {
    console.log("ERROR : ", e);
  }
}

export default generatePDF;
