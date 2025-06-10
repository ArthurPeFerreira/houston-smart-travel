import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface SeatsTaskStatusProps {
  isScheduled: boolean;
}

export function SeatsTaskStatus({ isScheduled }: SeatsTaskStatusProps) {
  const message = isScheduled
    ? "Fetching Seats task is already scheduled."
    : "Fetching Seats task is NOT scheduled yet.";

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white w-full text-wrap sm:text-nowrap h-fit">
      <div className="flex items-center gap-3">
        {isScheduled ? (
          <FaCheckCircle className="text-green-400" size={24} />
        ) : (
          <FaTimesCircle className="text-red-400" size={24} />
        )}
        <span className="text-lg font-medium">{message}</span>
      </div>
    </div>
  );
}
