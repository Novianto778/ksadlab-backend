/*
  Warnings:

  - You are about to drop the column `module_url` on the `CourseSubmodule` table. All the data in the column will be lost.
  - Added the required column `submodule_url` to the `CourseSubmodule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseSubmodule" DROP COLUMN "module_url",
ADD COLUMN     "submodule_url" VARCHAR(255) NOT NULL;
