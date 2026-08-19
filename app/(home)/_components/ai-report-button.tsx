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
import { BotIcon, Loader2Icon } from "lucide-react"
import { generateAiReport } from "../actions/gerenate-ia-report"
import { useState } from "react"
import { ScrollArea } from "@/app/_components/ui/scroll-area"
import Markdown from "react-markdown"
import Link from "next/link"

interface AiReportButtonProps {
  hasPremiumPlan: boolean
  month: string
}

const AiReportButton = ({ month, hasPremiumPlan }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null)
  const [reportIsLoading, setReportIsLoading] = useState(false)
  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true)
      const aiReport = await generateAiReport({ month })
      setReport(aiReport)
    } catch (error) {
      console.error(error)
    } finally {
      setReportIsLoading(false)
    }
  }
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setReport(null)
        }
      }}
    >
      <DialogTrigger
        render={
          <Button variant="ghost" className="rounded-full font-bold">
            Relatório IA
            <BotIcon />
          </Button>
        }
      ></DialogTrigger>
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

            <ScrollArea className="prose prose-h3:text-white prose-h4:text-white prose-strong:text-white max-h-112.5 text-white">
              <Markdown>{report}</Markdown>
            </ScrollArea>

            <DialogFooter>
              <DialogClose render={<Button variant="ghost">Cancelar</Button>} />
              <Button
                onClick={handleGenerateReportClick}
                disabled={reportIsLoading}
              >
                {reportIsLoading && <Loader2Icon className="animate-spin" />}
                Gerar relatório
              </Button>
            </DialogFooter>
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

            <ScrollArea className="prose prose-h3:text-white prose-h4:text-white prose-strong:text-white max-h-112.5 text-white">
              <Markdown>{report}</Markdown>
            </ScrollArea>

            <DialogFooter>
              <DialogClose />
              <Button
                render={<Link href="/subscription">Assinar plano premium</Link>}
              ></Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AiReportButton
