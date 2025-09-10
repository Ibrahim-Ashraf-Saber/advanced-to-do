import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TaskItemSkeleton() {
  return (
    <div
      className="p-5 rounded-2xl shadow-md flex flex-col justify-between gap-3 
                    bg-gray-100 border border-gray-300 
                    dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-900/50"
    >
      <div className="flex items-center justify-between">
        <Skeleton
          width={120}
          height={20}
          baseColor="#E0E0E0"
          className="dark:!bg-gray-700"
        />
        <Skeleton
          circle
          width={20}
          height={20}
          baseColor="#E0E0E0"
          className="dark:!bg-gray-700"
        />
      </div>

      <Skeleton count={2} baseColor="#E0E0E0" className="dark:!bg-gray-700" />

      <div className="flex justify-end">
        <Skeleton
          width={100}
          height={12}
          baseColor="#E0E0E0"
          className="dark:!bg-gray-700"
        />
      </div>

      <div className="flex justify-between items-center mt-2">
        <Skeleton
          circle
          width={30}
          height={30}
          baseColor="#E0E0E0"
          className="dark:!bg-gray-700"
        />
        <div className="flex gap-2">
          <Skeleton
            circle
            width={24}
            height={24}
            baseColor="#E0E0E0"
            className="dark:!bg-gray-700"
          />
          <Skeleton
            circle
            width={24}
            height={24}
            baseColor="#E0E0E0"
            className="dark:!bg-gray-700"
          />
        </div>
      </div>
    </div>
  );
}

export default TaskItemSkeleton;
