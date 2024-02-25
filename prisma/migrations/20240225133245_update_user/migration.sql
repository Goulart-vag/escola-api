/*
  Warnings:

  - Added the required column `access` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserAccess" AS ENUM ('ADMIN', 'MODERATOR', 'TEACHER', 'STUDENT');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "access" "UserAccess" NOT NULL;
