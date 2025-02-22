import PlanCard from "./_components/PlanCard";

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
    price: 10,
    features: [
      "1000 credit points",
      "24/7 Customer Support",
      "Basic storage space",
    ],
  },
  {
    id: 30,
    name: "Enterprise",
    price: 20,
    features: [
      "2000 credit points",
      "24/7 Customer Support",
      "Advanced storage space",
    ],
  },
];

function Upgrade() {
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
            planType={plan.name}
            price={plan.price}
            features={plan.features}
          />
        ))}
      </div>
    </div>
  );
}

export default Upgrade;
