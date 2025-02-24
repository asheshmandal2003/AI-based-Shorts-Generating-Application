"use client";

import { useToast } from "@/hooks/use-toast";
import PlanCard from "./_components/PlanCard";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useContext, useEffect, useState } from "react";
import { CreditsContext } from "@/app/_context/CreditsContext";
import TransactionsTable from "./_components/TransactionsTable";

const plans = [
  {
    id: 10,
    name: "Free",
    price: 0,
    features: [
      "30 credit points",
      "Limited Customer Support",
      "Basic storage space",
    ],
  },
  {
    id: 20,
    name: "Pro",
    price: 999,
    features: [
      "1000 credit points",
      "24/7 Customer Support",
      "Basic storage space",
    ],
  },
  {
    id: 30,
    name: "Enterprise",
    price: 1999,
    features: [
      "2000 credit points",
      "24/7 Customer Support",
      "Advanced storage space",
    ],
  },
];

function Upgrade() {
  const { toast } = useToast();
  const { isLoaded, user } = useUser();
  const { setCredits } = useContext(CreditsContext);
  const [loading, setLoading] = useState(() => null);
  const [transactions, setTransactions] = useState(() => []);

  const createOrderId = async (amount) => {
    try {
      const response = await axios.post(
        "/api/order",
        { amount: amount * 100 },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data.orderId;
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create order",
        variant: "destructive",
      });
      return null;
    }
  };

  const processPayment = async (id, amount) => {
    setLoading(id);
    try {
      const orderId = await createOrderId(amount);
      if (!orderId) return;

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "ShortsBot",
        description: "Upgrade Plan",
        image: "/logo.svg",
        order_id: orderId,
        handler: async (response) => {
          try {
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;
            const paymentData = {
              orderCreationId: orderId,
              razorpayPaymentId: razorpay_payment_id,
              razorpay_order_id,
              razorpaySignature: razorpay_signature,
              userId: user.id,
              amount,
            };

            const res = await axios.post("/api/verify", paymentData, {
              headers: { "Content-Type": "application/json" },
            });

            toast({
              title: res.data.isOk ? "Success" : "Error",
              description: res.data.isOk
                ? "Payment successful"
                : "Payment failed",
              variant: res.data.isOk ? "success" : "destructive",
            });

            setCredits((prev) => prev + (amount === 999 ? 1000 : 2000));
          } catch (error) {
            toast({
              title: "Error",
              description:
                error.response?.data?.message || "Payment verification failed",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: user.fullName,
          email: user.emailAddresses[0].emailAddress,
        },
        theme: {
          color: "#000",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", (response) => {
        toast({
          title: "Payment Failed",
          description: response.error.description,
          variant: "destructive",
        });
      });

      paymentObject.open();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Payment processing failed",
        variant: "destructive",
      });
    }
    setLoading(null);
  };

  async function fetchTransactions() {
    if (!isLoaded || !user) return;
    const userId = user.id;

    await axios
      .get("/api/get-transactions", {
        params: { userId },
      })
      .then((res) => {
        setTransactions(res.data.result);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description:
            err.response?.data?.error || "Failed to fetch transactions!",
          variant: "destructive",
        });
      });
  }

  useEffect(() => {
    const abortController = new AbortController();
    fetchTransactions();
    return () => {
      abortController;
    };
  }, [isLoaded, user]);

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="font-bold text-2xl mt-5">Choose your plan</p>
      <p className="font-semibold text-gray-400 italic mt-2">
        Select one of your favorite plan and get the facilities
      </p>
      <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            id={plan.id}
            planType={plan.name}
            price={plan.price}
            features={plan.features}
            processPayment={() => processPayment(plan.id, plan.price)}
            loading={loading}
          />
        ))}
      </div>
      {transactions.length > 0 && (
        <TransactionsTable transactions={transactions} />
      )}
    </div>
  );
}

export default Upgrade;
