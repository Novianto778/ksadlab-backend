-- CreateTable
CREATE TABLE "User" (
    "user_id" UUID NOT NULL,
    "email" CHAR NOT NULL,
    "nama" CHAR NOT NULL,
    "password" CHAR NOT NULL,
    "role" CHAR NOT NULL,
    "level" SMALLINT NOT NULL,
    "angkatan" SMALLINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMETZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "assignment_id" UUID NOT NULL,
    "title" CHAR NOT NULL,
    "description" CHAR,
    "start_date" TIMESTAMP(6) NOT NULL,
    "due_date" TIMESTAMP(6) NOT NULL,
    "assignment_task_url" CHAR NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("assignment_id")
);

-- CreateTable
CREATE TABLE "AssignmentModule" (
    "assignment_id" UUID NOT NULL,
    "course_module_id" UUID NOT NULL,

    CONSTRAINT "AssignmentModule_pkey" PRIMARY KEY ("assignment_id","course_module_id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "comment_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "parent_id" UUID,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "Course" (
    "course_id" UUID NOT NULL,
    "title" CHAR NOT NULL,
    "description" TEXT NOT NULL,
    "level" SMALLINT NOT NULL,
    "cover" CHAR,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "CourseModule" (
    "course_module_id" UUID NOT NULL,
    "module_title" CHAR NOT NULL,
    "order_level" SMALLINT NOT NULL,
    "course_id" UUID NOT NULL,

    CONSTRAINT "CourseModule_pkey" PRIMARY KEY ("course_module_id")
);

-- CreateTable
CREATE TABLE "CourseProgress" (
    "progress_id" UUID NOT NULL,
    "completed_at" TIMESTAMP(6),
    "course_module_id" UUID NOT NULL,
    "course_submodule_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "CourseProgress_pkey" PRIMARY KEY ("progress_id")
);

-- CreateTable
CREATE TABLE "CourseSubmodule" (
    "course_submodule_id" UUID NOT NULL,
    "submodule_title" CHAR NOT NULL,
    "submodule_type" CHAR NOT NULL,
    "module_url" CHAR NOT NULL,
    "order_level" SMALLINT NOT NULL,
    "course_module_id" UUID NOT NULL,

    CONSTRAINT "CourseSubmodule_pkey" PRIMARY KEY ("course_submodule_id")
);

-- CreateTable
CREATE TABLE "CourseType" (
    "course_type_id" SERIAL NOT NULL,
    "name" CHAR NOT NULL,

    CONSTRAINT "CourseType_pkey" PRIMARY KEY ("course_type_id")
);

-- CreateTable
CREATE TABLE "CourseTypePivot" (
    "course_type_id" SERIAL NOT NULL,
    "course_id" UUID NOT NULL,

    CONSTRAINT "CourseTypePivot_pkey" PRIMARY KEY ("course_type_id","course_id")
);

-- CreateTable
CREATE TABLE "Post" (
    "post_id" UUID NOT NULL,
    "title" CHAR NOT NULL,
    "content" TEXT NOT NULL,
    "cover" CHAR,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "UserAssignment" (
    "user_id" UUID NOT NULL,
    "assignment_id" UUID NOT NULL,
    "completion_status" BOOLEAN DEFAULT false,
    "submission_date" TIMESTAMP(6),
    "grade" SMALLINT DEFAULT 0,

    CONSTRAINT "UserAssignment_pkey" PRIMARY KEY ("user_id","assignment_id")
);

-- CreateTable
CREATE TABLE "UserNote" (
    "user_id" UUID NOT NULL,
    "course_submodule_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserNote_pkey" PRIMARY KEY ("user_id","course_submodule_id")
);

-- AddForeignKey
ALTER TABLE "AssignmentModule" ADD CONSTRAINT "AssignmentModule_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignment"("assignment_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AssignmentModule" ADD CONSTRAINT "AssignmentModule_course_module_id_fkey" FOREIGN KEY ("course_module_id") REFERENCES "CourseModule"("course_module_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Comment"("comment_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourseModule" ADD CONSTRAINT "CourseModule_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_course_module_id_fkey" FOREIGN KEY ("course_module_id") REFERENCES "CourseModule"("course_module_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_course_submodule_id_fkey" FOREIGN KEY ("course_submodule_id") REFERENCES "CourseSubmodule"("course_submodule_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourseSubmodule" ADD CONSTRAINT "CourseSubmodule_course_module_id_fkey" FOREIGN KEY ("course_module_id") REFERENCES "CourseModule"("course_module_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourseTypePivot" ADD CONSTRAINT "CourseTypePivot_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourseTypePivot" ADD CONSTRAINT "CourseTypePivot_course_type_id_fkey" FOREIGN KEY ("course_type_id") REFERENCES "CourseType"("course_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserAssignment" ADD CONSTRAINT "UserAssignment_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignment"("assignment_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserAssignment" ADD CONSTRAINT "UserAssignment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserNote" ADD CONSTRAINT "UserNote_course_submodule_id_fkey" FOREIGN KEY ("course_submodule_id") REFERENCES "CourseSubmodule"("course_submodule_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserNote" ADD CONSTRAINT "UserNote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
