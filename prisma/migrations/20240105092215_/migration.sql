/*
  Warnings:

  - You are about to drop the column `module_title` on the `CourseModule` table. All the data in the column will be lost.
  - Added the required column `submodule_title` to the `CourseModule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseModule" DROP COLUMN "module_title",
ADD COLUMN     "submodule_title" VARCHAR(255) NOT NULL;
