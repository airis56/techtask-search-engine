-- CreateTable
CREATE TABLE "game_alias" (
    "id" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "game_alias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "game_alias_alias_idx" ON "game_alias"("alias");

-- AddForeignKey
ALTER TABLE "game_alias" ADD CONSTRAINT "game_alias_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
