import { FaTasks, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

function DashboardNumbers({ status }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white border-b-blue-500 border-b-4 dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center">
        <FaTasks className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Tasks
        </h3>
        <p className="text-3xl font-bold text-blue-500">{status.total}</p>
      </div>

      <div className="bg-white border-b-green-500 border-b-4 dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center">
        <FaCheckCircle className="text-green-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Completed
        </h3>
        <p className="text-3xl font-bold text-green-500">{status.complete}</p>
      </div>

      <div className="bg-white border-b-yellow-500 border-b-4 dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center">
        <FaHourglassHalf className="text-yellow-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Pending
        </h3>
        <p className="text-3xl font-bold text-yellow-500">{status.pending}</p>
      </div>
    </div>
  );
}

export default DashboardNumbers;
