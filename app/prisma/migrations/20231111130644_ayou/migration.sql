-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "last_activity" TIMESTAMP(3) NOT NULL,
    "games" INTEGER NOT NULL DEFAULT 0,
    "win" INTEGER NOT NULL DEFAULT 0,
    "lose" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friendship" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "userID" TEXT NOT NULL,
    "photo_path" TEXT NOT NULL,
    "friend_number" INTEGER NOT NULL DEFAULT 0,
    "level" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "level_desc" TEXT NOT NULL DEFAULT 'Noobie',
    "total_profit" DOUBLE PRECISION NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "games_history" (
    "id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "opponent_id" TEXT NOT NULL,
    "xp_level" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" BOOLEAN NOT NULL,

    CONSTRAINT "games_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "SenderID" TEXT NOT NULL,
    "message_content" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "convo_id" TEXT NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievement" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "kickstart" BOOLEAN NOT NULL,
    "social" BOOLEAN NOT NULL,
    "first_game" BOOLEAN NOT NULL,
    "level_1" BOOLEAN NOT NULL,
    "level_5" BOOLEAN NOT NULL,

    CONSTRAINT "achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversation" (
    "convo_id" TEXT NOT NULL,
    "convo_type" BOOLEAN NOT NULL,
    "convo_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversation_pkey" PRIMARY KEY ("convo_id")
);

-- CreateTable
CREATE TABLE "participants" (
    "participant_id" TEXT NOT NULL,
    "convo_id" TEXT NOT NULL,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("participant_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userID_key" ON "Profile"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "achievement_user_id_key" ON "achievement"("user_id");

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games_history" ADD CONSTRAINT "games_history_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games_history" ADD CONSTRAINT "games_history_opponent_id_fkey" FOREIGN KEY ("opponent_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_SenderID_fkey" FOREIGN KEY ("SenderID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_convo_id_fkey" FOREIGN KEY ("convo_id") REFERENCES "conversation"("convo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievement" ADD CONSTRAINT "achievement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_convo_id_fkey" FOREIGN KEY ("convo_id") REFERENCES "conversation"("convo_id") ON DELETE RESTRICT ON UPDATE CASCADE;
