"use client";

import ReactPDF, {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  confidentialityTermDisplay,
  effectiveDateDisplay,
  mndaTermDisplay,
  type NdaData,
} from "@/lib/nda";
import { standardTerms, termsFooter, type Run } from "@/lib/standardTerms";

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: "Times-Roman",
    fontSize: 11,
    lineHeight: 1.5,
    color: "#111111",
  },
  title: {
    fontSize: 18,
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  heading: { fontFamily: "Times-Bold", marginBottom: 4, marginTop: 12 },
  indent: { paddingLeft: 18 },
  italic: { fontStyle: "italic" },
  defined: { textDecoration: "underline" },
  term: { marginBottom: 8 },
  termLead: { fontFamily: "Times-Bold" },
  checkboxRow: { flexDirection: "row", alignItems: "center" },
  checkbox: {
    width: 9,
    height: 9,
    borderWidth: 1,
    borderColor: "#111111",
    marginRight: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  checkMark: { fontSize: 7, fontFamily: "Times-Bold" },
  table: {
    borderWidth: 1,
    borderColor: "#111111",
    marginTop: 10,
    marginBottom: 20,
  },
  tableRow: { flexDirection: "row" },
  tableLabel: {
    width: 110,
    borderWidth: 0.5,
    borderColor: "#111111",
    padding: 4,
    fontFamily: "Times-Bold",
    fontSize: 10,
  },
  tableCell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#111111",
    padding: 4,
    fontSize: 10,
    minHeight: 16,
  },
  tableHeader: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#111111",
    padding: 4,
    fontFamily: "Times-Bold",
    fontSize: 10,
    textAlign: "center",
  },
  corner: {
    width: 110,
    borderWidth: 0.5,
    borderColor: "#111111",
  },
  footer: { textAlign: "center", fontSize: 9, marginTop: 24 },
  partyBlock: { marginBottom: 4 },
});

function Runs({ runs }: { runs: Run[] }) {
  return (
    <>
      {runs.map((run, i) =>
        typeof run === "string" ? (
          run
        ) : (
          <Text key={i} style={styles.defined}>
            {run.defined}
          </Text>
        ),
      )}
    </>
  );
}

function Check({ checked }: { checked: boolean }) {
  return (
    <View style={styles.checkbox}>
      {checked ? <Text style={styles.checkMark}>X</Text> : null}
    </View>
  );
}

function PartyTable({ data }: { data: NdaData }) {
  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={styles.corner} />
        <Text style={styles.tableHeader}>PARTY 1</Text>
        <Text style={styles.tableHeader}>PARTY 2</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableLabel}>Signature</Text>
        <Text style={styles.tableCell}> </Text>
        <Text style={styles.tableCell}> </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableLabel}>Print Name</Text>
        <Text style={styles.tableCell}>{data.party1.printName}</Text>
        <Text style={styles.tableCell}>{data.party2.printName}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableLabel}>Title</Text>
        <Text style={styles.tableCell}>{data.party1.title}</Text>
        <Text style={styles.tableCell}>{data.party2.title}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableLabel}>Company</Text>
        <Text style={styles.tableCell}>{data.party1.company}</Text>
        <Text style={styles.tableCell}>{data.party2.company}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableLabel}>Notice Address</Text>
        <Text style={styles.tableCell}>{data.party1.noticeAddress}</Text>
        <Text style={styles.tableCell}>{data.party2.noticeAddress}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableLabel}>Date</Text>
        <Text style={styles.tableCell}> </Text>
        <Text style={styles.tableCell}> </Text>
      </View>
    </View>
  );
}

export function NdaPdfDocument({ data }: { data: NdaData }) {
  return (
    <Document title="Mutual Non-Disclosure Agreement">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Mutual Non-Disclosure Agreement</Text>

        <Text style={styles.sectionTitle}>Using this Mutual Non-Disclosure Agreement</Text>
        <Text style={[styles.indent, styles.italic, { marginBottom: 14 }]}>
          {"This Mutual Non-Disclosure Agreement (the “MNDA”) consists of: (1) this Cover Page (“Cover Page”) and (2) the Common Paper Mutual NDA Standard Terms Version 1.0 (“Standard Terms”) identical to those posted at commonpaper.com/standards/mutual-nda/1.0. Any modifications of the Standard Terms should be made on the Cover Page, which will control over conflicts with the Standard Terms."}
        </Text>

        <Text style={styles.heading}>Purpose</Text>
        <Text style={[styles.indent, styles.italic]}>{`[${data.purpose}]`}</Text>

        <Text style={styles.heading}>Effective Date</Text>
        <Text style={styles.indent}>[{effectiveDateDisplay(data)}]</Text>

        <Text style={styles.heading}>MNDA Term</Text>
        <View style={[styles.indent, styles.checkboxRow]}>
          <Check checked={data.mndaTermFixed} />
          <Text>{mndaTermDisplay(data)}</Text>
        </View>
        <View style={[styles.indent, styles.checkboxRow]}>
          <Check checked={!data.mndaTermFixed} />
          <Text>Continues until terminated in accordance with the terms of the MNDA.</Text>
        </View>

        <Text style={styles.heading}>Term of Confidentiality</Text>
        <View style={[styles.indent, styles.checkboxRow]}>
          <Check checked={data.confidentialityFixed} />
          <Text>{confidentialityTermDisplay(data)}</Text>
        </View>
        <View style={[styles.indent, styles.checkboxRow]}>
          <Check checked={!data.confidentialityFixed} />
          <Text>In perpetuity.</Text>
        </View>

        <Text style={styles.heading}>Governing Law &amp; Jurisdiction</Text>
        <Text style={styles.indent}>Governing Law: [{data.governingLaw}]</Text>
        <Text style={styles.indent}>Jurisdiction: [{data.jurisdiction}]</Text>

        <Text style={styles.heading}>MNDA Modifications</Text>
        <Text style={[styles.indent, styles.italic]}>
          [{data.modifications.trim() || "None"}]
        </Text>

        <Text style={{ marginTop: 14 }}>
          By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective
          Date.
        </Text>

        <PartyTable data={data} />

        <Text
          style={[styles.title, { marginTop: 24 }]}
          break
        >
          Standard Terms
        </Text>

        {standardTerms.map((term) => (
          <Text key={term.number} style={styles.term}>
            <Text style={styles.termLead}>
              {term.number}. {term.title}.{" "}
            </Text>
            <Runs runs={term.body} />
          </Text>
        ))}

        <Text style={styles.footer}>{termsFooter}</Text>
      </Page>
    </Document>
  );
}

export async function renderNdaPdfBlob(data: NdaData): Promise<Blob> {
  const { pdf } = await import("@react-pdf/renderer");
  return pdf(<NdaPdfDocument data={data} />).toBlob();
}
