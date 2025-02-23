import { Loader, Star } from "lucide-react";

function Credits({ credits, loading }) {
  return (
    <div className="flex justify-center items-center gap-2 border border-gray-300 rounded-sm px-3 py-1 w-fit">
      <Star className="text-yellow-400" />
      {loading ? (
        <Loader className="text-gray-400 animate-spin" />
      ) : (
        <p className="font-bold text-yellow-500">{credits}</p>
      )}
    </div>
  );
}

export default Credits;
