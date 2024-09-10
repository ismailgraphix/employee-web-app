-- Updating existing rows
UPDATE "Department"
SET "addedById" = (SELECT "id" FROM "User" LIMIT 1);

-- Altering column to make it non-nullable
ALTER TABLE "Department"
ALTER COLUMN "addedById" SET NOT NULL;

-- Adding `middleName` column to Employee table with default value
ALTER TABLE "Employee"
ADD COLUMN "middleName" VARCHAR(255) DEFAULT '';
