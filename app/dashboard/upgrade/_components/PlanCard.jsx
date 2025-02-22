import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { CircleCheck, ShoppingBag } from "lucide-react";

function PlanCard({ id, planType, price, features, processPayment }) {
  return (
    <div className="border border-gray-300 rounded-md px-6 py-3">
      <p className="text-lg font-semibold">{planType}</p>
      <Separator className="my-5 h-px bg-gray-300 w-full" />
      <div className="mb-6">
        <span className="text-lg font-semibold">₹</span>
        <span className="text-3xl font-bold">{price}</span>
      </div>
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-2 mt-2">
          <CircleCheck className="text-green-400" />
          <p className="text-gray-400">{feature}</p>
        </div>
      ))}
      {price === 0 ? (
        <Button className="my-10 w-full" disabled>
          <CircleCheck />
          Applied
        </Button>
      ) : (
        <Button className="my-10 w-full" onClick={() => processPayment(id)}>
          <ShoppingBag /> Purchase
        </Button>
      )}
    </div>
  );
}

export default PlanCard;
