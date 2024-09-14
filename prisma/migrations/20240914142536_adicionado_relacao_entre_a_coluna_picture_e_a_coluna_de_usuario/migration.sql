/*
  Warnings:

  - You are about to drop the column `username_id` on the `pictures` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pictures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "picture_url" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "user_id" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pictures_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_pictures" ("createdAt", "id", "picture_url", "title", "username") SELECT "createdAt", "id", "picture_url", "title", "username" FROM "pictures";
DROP TABLE "pictures";
ALTER TABLE "new_pictures" RENAME TO "pictures";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
