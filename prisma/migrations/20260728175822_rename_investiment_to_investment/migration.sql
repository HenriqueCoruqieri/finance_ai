/*
  Warnings:

  - The values [INVESTMENT] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "TransactionType" RENAME VALUE 'INVESTMENT' TO 'INVESTMENT';