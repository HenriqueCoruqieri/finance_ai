import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer"
import { ReportBlock } from "./types"

const styles = StyleSheet.create({
  page: {
    paddingVertical: 40,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.5,
    color: "#1F1F1F",
  },
  header: {
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    borderBottomStyle: "solid",
  },
  title: { fontFamily: "Helvetica-Bold", fontSize: 18, color: "#111111" },
  subtitle: { fontSize: 10, color: "#6B6B6B", marginTop: 4 },
  heading1: {
    fontFamily: "Helvetica-Bold",
    fontSize: 15,
    marginTop: 16,
    marginBottom: 6,
  },
  heading2: {
    fontFamily: "Helvetica-Bold",
    fontSize: 13,
    marginTop: 14,
    marginBottom: 5,
  },
  heading3: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    marginTop: 12,
    marginBottom: 4,
  },
  paragraph: { marginBottom: 6, textAlign: "justify" },
  listItem: { flexDirection: "row", marginBottom: 4, paddingLeft: 8 },
  listBullet: { width: 12 },
  listText: { flex: 1 },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 48,
    right: 48,
    fontSize: 9,
    color: "#9A9A9A",
    textAlign: "center",
  },
})

const HEADING_STYLES = {
  1: styles.heading1,
  2: styles.heading2,
  3: styles.heading3,
} as const

interface ReportPdfDocumentProps {
  blocks: ReportBlock[]
  monthLabel: string
}

const ReportPdfDocument = ({ blocks, monthLabel }: ReportPdfDocumentProps) => (
  <Document title={`Relatório IA - ${monthLabel}`}>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Relatório IA</Text>
        <Text style={styles.subtitle}>Referente a {monthLabel}</Text>
      </View>

      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <Text key={index} style={HEADING_STYLES[block.level]}>
              {block.text}
            </Text>
          )
        }

        if (block.type === "listItem") {
          return (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listBullet}>•</Text>
              <Text style={styles.listText}>{block.text}</Text>
            </View>
          )
        }

        return (
          <Text key={index} style={styles.paragraph}>
            {block.text}
          </Text>
        )
      })}

      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
)

export default ReportPdfDocument
