"use client"

import { Button } from "@/app/_components/ui/button"
import { DialogClose, DialogFooter } from "@/app/_components/ui/dialog"
import { DownloadIcon, Loader2Icon } from "lucide-react"

interface AiReportDialogFooterProps {
  hasReport: boolean
  isGenerating: boolean
  isDownloading: boolean
  onGenerate: () => void
  onDownload: () => void
}

const AiReportDialogFooter = ({
  hasReport,
  isGenerating,
  isDownloading,
  onGenerate,
  onDownload,
}: AiReportDialogFooterProps) => (
  <DialogFooter>
    <DialogClose render={<Button variant="ghost">Cancelar</Button>} />

    {hasReport ? (
      <Button onClick={onDownload} disabled={isDownloading}>
        {isDownloading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <DownloadIcon />
        )}
        Baixar PDF
      </Button>
    ) : (
      <Button onClick={onGenerate} disabled={isGenerating}>
        {isGenerating && <Loader2Icon className="animate-spin" />}
        Gerar relatório
      </Button>
    )}
  </DialogFooter>
)

export default AiReportDialogFooter
