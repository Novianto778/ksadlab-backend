/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Assignment" ALTER COLUMN "title" SET DATA TYPE CHAR,
ALTER COLUMN "description" SET DATA TYPE CHAR,
ALTER COLUMN "assignment_task_url" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "title" SET DATA TYPE CHAR,
ALTER COLUMN "cover" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "CourseModule" ALTER COLUMN "module_title" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "CourseSubmodule" ALTER COLUMN "submodule_title" SET DATA TYPE CHAR,
ALTER COLUMN "submodule_type" SET DATA TYPE CHAR,
ALTER COLUMN "module_url" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "CourseType" ALTER COLUMN "name" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" SET DATA TYPE CHAR,
ALTER COLUMN "cover" SET DATA TYPE CHAR;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE CHAR,
ALTER COLUMN "nama" SET DATA TYPE CHAR,
ALTER COLUMN "password" SET DATA TYPE CHAR,
ALTER COLUMN "role" SET DATA TYPE CHAR;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
