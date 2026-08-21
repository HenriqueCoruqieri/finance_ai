import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { parseMarkdownBlocks } from "./parse-markdown-blocks"

const buildMonthLabel = (month: string) =>
  format(
    new Date(new Date().getFullYear(), Number(month) - 1),
    "MMMM 'de' yyyy",
    {
      locale: ptBR,
    },
  )

export const downloadReportPdf = async (report: string, month: string) => {
  const [{ pdf }, { default: ReportPdfDocument }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("./report-pdf-document"),
  ])

  const blob = await pdf(
    <ReportPdfDocument
      blocks={parseMarkdownBlocks(report)}
      monthLabel={buildMonthLabel(month)}
    />,
  ).toBlob()

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `relatorio-ia-${month}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
