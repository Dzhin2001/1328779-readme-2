-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "idOriginal" INTEGER NOT NULL,
    "isRepost" BOOLEAN NOT NULL,
    "postType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT NOT NULL,
    "textPreview" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "quoteText" TEXT NOT NULL,
    "quoteAuthor" TEXT NOT NULL,
    "videoURL" TEXT NOT NULL,
    "photoURL" TEXT NOT NULL,
    "linkText" TEXT NOT NULL,
    "linkURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "isDelete" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
