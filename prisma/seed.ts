// prisma/createWish.ts
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function createWish(from: string, message: string) {
  try {
    const wish = await prisma.wish.create({
      data: {
        from,
        message,
      },
    });

    console.log("Wish created:", wish);
    return wish;
  } catch (error) {
    console.error("Error creating wish:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Example usage
createWish("Jay", "I hope everyone has a Merry Christmas!");
