// PdfGenerator.js
import React from "react";
import { G, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import SalesTemplate from "../../templates/SalesTemplate";
import { useStoreContext } from "../../hooks/useStoreContext";

const PdfGenerator = ({ data }) => {
  const { storeData } = useStoreContext();
  console.log(storeData.name);
  const startDate = data[0].products[0].createdAt.split("T")[0];
  const endDate = data[data.length - 1].products[0].createdAt.split("T")[0];

  const dataToDocument = {
    sales: data,
    date: {
      startDate,
      endDate,
    },
    storeData,
  };

  return (
    <PDFDownloadLink document={<SalesTemplate data={dataToDocument} />}>
      {({ blob, url, loading, error }) => {
        if (loading) {
          return <p>Loading document...</p>;
        }
        return (
          <a
            href={url}
            download={`sales_raport_${startDate}--${endDate}.pdf`}
            className="pdf-download"
          >
            Download a PDF report
          </a>
        );
      }}
    </PDFDownloadLink>
  );
};

export default PdfGenerator;
