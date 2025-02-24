import { db } from "@/config/db";
import { redis } from "@/config/redis";
import { Payments } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const cachedTransactions = await redis.get(`transactions:${userId}`);

    if (cachedTransactions) {
      const transactionsInJSON = await JSON.parse(cachedTransactions);
      return NextResponse.json({ result: transactionsInJSON }, { status: 200 });
    }

    const transactions = await db
      .select({
        id: Payments.id,
        amount: Payments.amount,
        createdAt: Payments.createdAt,
      })
      .from(Payments)
      .where(eq(Payments.userId, userId));

    await redis.set(
      `transactions:${userId}`,
      JSON.stringify(transactions),
      "EX",
      3600
    );

    return NextResponse.json({ result: transactions }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
