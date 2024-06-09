// MyPdfTemplate.js

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../assets/images/logo.png";
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    paddingBottom: 15,
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableHead: {
    backgroundColor: "rgba(182, 198, 230, 0.35)",
    margin: "auto",
    flexDirection: "row",
  },

  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    textAlign: "center",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    marginHorizontal: "auto",
    marginTop: 5,
    padding: 5,
    fontSize: 12,
    // textAlign: "center",
  },
  reportInfo: {
    marginVertical: 15,
  },
  tableCellLight: {
    fontWeight: "light",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  logo: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 75,
    height: 75,
  },
});

const MyPdfTemplate = ({ data }) => {
  const { sales, date, storeData } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* HEADER */}
          <Text style={styles.header}>Sales report</Text>
          <Image style={styles.logo} src={logo}></Image>
          <View style={styles.reportInfo}>
            <Text style={styles.tableCellLight}>Store: {storeData.name}</Text>
            <Text style={styles.tableCellLight}>From: {date.startDate}</Text>
            <Text style={styles.tableCellLight}>To: {date.endDate} </Text>
            <Text style={styles.tableCellLight}>All sales: {sales.length}</Text>
          </View>

          {/* TABELA */}
          <View style={styles.table}>
            {/* naglowek tabeli TABLEHEAD*/}
            <View style={styles.tableHead}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>ID</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Quantity</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Store</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Date</Text>
              </View>
            </View>
            {/* Kazdy wiersz po kolei w zaleznosci od ilosci produktow  TABLEBODY*/}
            {sales.map((item, index) => {
              return (
                <View key={index} style={styles.tableRow}>
                  {/* kolumna z ID  */}
                  <View style={styles.tableCol} key={index}>
                    {item.products.map((product, index) => {
                      return (
                        <Text key={index} style={styles.tableCell}>
                          {product.product_id}
                        </Text>
                      );
                    })}
                  </View>
                  {/* Kolumna z ilością */}
                  <View style={styles.tableCol} key={index}>
                    {item.products.map((product, index) => {
                      return (
                        <Text key={index} style={styles.tableCell}>
                          {product.quantity} psc.
                        </Text>
                      );
                    })}
                  </View>

                  {/* Kolumna ze sklepem */}
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.store}</Text>
                  </View>

                  {/* Kolumna ze datą */}
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {item.createdAt.split("T")[0]}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          {/* ^Koniec tabeli */}
        </View>
      </Page>
    </Document>
  );
};

export default MyPdfTemplate;
