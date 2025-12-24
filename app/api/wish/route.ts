import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma";

export async function POST(req: NextRequest) {
  try {
    const { from, wish } = await req.json();

    // Basic validation
    if (!from?.trim() || !wish?.trim()) {
      return NextResponse.json(
        { error: "Both 'from' and 'wish' fields are required." },
        { status: 400 }
      );
    }

    // Create new wish in database
    const newWish = await prisma.wish.create({
      data: {
        fromName: from.trim(),
        wish: wish.trim(),
      },
    });

    return NextResponse.json({ success: true, id: newWish.id });
  } catch (err) {
    console.error("Failed to create wish:", err);
    return NextResponse.json(
      { error: "Failed to create wish." },
      { status: 500 }
    );
  }
}
