/*
  Warnings:

  - Added the required column `course_id` to the `CourseProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseProgress" ADD COLUMN     "course_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
