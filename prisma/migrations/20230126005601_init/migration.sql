-- CreateTable
CREATE TABLE "Waitlist" (
    "id" SERIAL NOT NULL,
    "guildID" BIGINT NOT NULL,
    "userID" BIGINT NOT NULL,
    "tag" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Waitlist_email_key" ON "Waitlist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Waitlist_guildID_userID_key" ON "Waitlist"("guildID", "userID");
