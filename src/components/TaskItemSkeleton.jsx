import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TaskItemSkeleton() {
  return (
    <div className="p-5 rounded-2xl shadow-md flex flex-col justify-between gap-3 bg-gray-50 border border-gray-200">
      <div className="flex items-center justify-between">
        <Skeleton width={120} height={20} />
        <Skeleton circle width={20} height={20} />
      </div>

      <Skeleton count={2} />

      <div className="flex justify-end">
        <Skeleton width={100} height={12} />
      </div>

      <div className="flex justify-between items-center mt-2">
        <Skeleton circle width={30} height={30} />
        <div className="flex gap-2">
          <Skeleton circle width={24} height={24} />
          <Skeleton circle width={24} height={24} />
        </div>
      </div>
    </div>
  );
}

export default TaskItemSkeleton;
