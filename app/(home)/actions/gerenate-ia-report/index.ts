"use server"

import { db } from "@/app/_lib/prisma"
import { auth, clerkClient } from "@clerk/nextjs/server"
import OpenAI from "openai"
import { GenerateAiReportSchema, generateAiReportSchema } from "./shcema"

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month })
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Unauthorized")
  }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan == "premium"
  if (!hasPremiumPlan) {
    throw new Error(
      "Você precisa fazer o upgrade no plano para utilizar o agente de IA",
    )
  }

  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`2026-${month}-01`),
        lt: new Date(`2026-${month}-31`),
      },
    },
  })

  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. 
                   As transações estão divididas por ponto e virgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`

  const completion = await openAi.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Você é um Economista Sênior e Especialista em Finanças Pessoais, com nível de Mestrado Acadêmico. Seu objetivo é analisar o histórico de movimentações financeiras fornecido pelo usuário e entregar insights macro e microeconômicos práticos. 
      
      Suas diretrizes de comportamento são:
      1. ANÁLISE RIGOROSA: Identifique padrões de consumo, gargalos de gastos, sazonalidades e anomalias nas transações.
      2. TOM DE VOZ: Seja extremamente profissional, didático, empático e focado em soluções que possam agregar para a vida do usuário. Evite julgamentos.
      3. INSIGHTS ACESSÍVEIS: Traduza conceitos complexos de economia (como custo de oportunidade, inflação pessoal e juros compostos) em linguagem simples e acionável.
      4. FOCO EM METAS: Sempre que detectar um desvio financeiro, sugira uma estratégia econômica fundamentada para correção de rota, priorizando a criação de reserva de emergência e capacidade de investimento.
      5. RESTRIÇÃO: Não dê conselhos diretos de compra de ativos específicos (ações, fundos). Foque na saúde estrutural do orçamento do usuário.`,
      },

      {
        role: "user",
        content,
      },
    ],
  })
  return completion.choices[0].message.content
}
