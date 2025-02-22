import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/config/db";
import { Payments, Users } from "@/config/schema";
import { eq, sql } from "drizzle-orm";

const generateSignature = (orderId, paymentId) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    throw new Error(
      "RAZORPAY_KEY_SECRET is not defined in environment variables."
    );
  }

  return crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
};

export async function POST(request) {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpaySignature,
      userId,
      amount,
    } = await request.json();

    if (
      !orderCreationId ||
      !razorpayPaymentId ||
      !razorpaySignature ||
      !userId ||
      !amount
    ) {
      return NextResponse.json(
        { message: "Invalid request: Missing required fields", isOk: false },
        { status: 400 }
      );
    }

    const generatedSig = generateSignature(orderCreationId, razorpayPaymentId);

    if (generatedSig !== razorpaySignature) {
      return NextResponse.json(
        {
          message: "Payment verification failed: Signature mismatch",
          isOk: false,
        },
        { status: 400 }
      );
    }

    await handleSubscription(razorpayPaymentId, userId, amount);
    return NextResponse.json(
      { message: "Payment verified successfully", isOk: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in payment verification:", error.message);

    return NextResponse.json(
      { message: "Internal server error", isOk: false, error: error.message },
      { status: 500 }
    );
  }
}

async function handleSubscription(razorpayPaymentId, userId, amount) {
  try {
    await db.insert(Payments).values({
      id: razorpayPaymentId,
      userId,
      amount,
    });

    await db
      .update(Users)
      .set({
        subscription: true,
        credits: sql`${Users.credits} + ${amount === 999 ? 1000 : 2000}`,
      })
      .where(eq(Users.id, userId));
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", isOk: false, error: error.message },
      { status: 500 }
    );
  }
}
