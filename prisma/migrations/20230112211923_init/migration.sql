-- CreateTable
CREATE TABLE "Waitlist" (
    "id" SERIAL NOT NULL,
    "guildID" BIGINT NOT NULL,
    "userID" BIGINT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Waitlist_guildID_userID_key" ON "Waitlist"("guildID", "userID");
