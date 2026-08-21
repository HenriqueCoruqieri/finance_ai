"use client"

import { Button } from "@/app/_components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import { BotIcon } from "lucide-react"
import { generateAiReport } from "../actions/gerenate-ia-report"
import { useState } from "react"
import { ScrollArea } from "@/app/_components/ui/scroll-area"
import Markdown from "react-markdown"
import Link from "next/link"
import { toast } from "sonner"
import { downloadReportPdf } from "../_lib/download-report-pdf"
import AiReportDialogFooter from "./ai-report-dialog-footer"

interface AiReportButtonProps {
  hasPremiumPlan: boolean
  month: string
}

const AiReportButton = ({ month, hasPremiumPlan }: AiReportButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [report, setReport] = useState<string | null>(null)
  const [reportIsLoading, setReportIsLoading] = useState(false)
  const [reportIsDownloading, setReportIsDownloading] = useState(false)

  const handleDialogOpenChange = (open: boolean) => {
    setDialogIsOpen(open)
    if (!open) {
      setReport(null)
    }
  }

  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true)
      const aiReport = await generateAiReport({ month })
      setReport(aiReport)
    } catch (error) {
      console.error(error)
      toast.error("Ocorreu um erro ao gerar o relatório.")
    } finally {
      setReportIsLoading(false)
    }
  }

  const handleDownloadReportClick = async () => {
    if (!report) return

    setReportIsDownloading(true)
    try {
      await downloadReportPdf(report, month)
      toast.success("Relatório baixado com sucesso!")
      handleDialogOpenChange(false)
    } catch (error) {
      console.error(error)
      toast.error("Ocorreu um erro ao baixar o relatório.")
    } finally {
      setReportIsDownloading(false)
    }
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger
        render={
          <Button variant="ghost" className="rounded-full font-bold">
            Relatório IA
            <BotIcon />
          </Button>
        }
      />

      <DialogContent className="max-w-150">
        {hasPremiumPlan ? (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Use a inteligência artificial para gerar um relatório com
                insights sobre suas finanças
              </DialogDescription>
            </DialogHeader>

            {report && (
              <ScrollArea className="prose prose-h3:text-white prose-h4:text-white prose-strong:text-white max-h-112.5 text-white">
                <Markdown>{report}</Markdown>
              </ScrollArea>
            )}

            <AiReportDialogFooter
              hasReport={Boolean(report)}
              isGenerating={reportIsLoading}
              isDownloading={reportIsDownloading}
              onGenerate={handleGenerateReportClick}
              onDownload={handleDownloadReportClick}
            />
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Assine o plano premium para ter acesso ao agente de IA
                especialista em economia pessoal.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose render={<Button variant="ghost">Cancelar</Button>} />
              <Button
                render={<Link href="/subscription">Assinar plano premium</Link>}
              />
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AiReportButton
