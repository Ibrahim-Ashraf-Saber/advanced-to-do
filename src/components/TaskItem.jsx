import { useState } from "react";
import { useToDo } from "../hooks/useToDo";
import UpdateTaskDialog from "./UpdateTaskDialog";
import Swal from "sweetalert2";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { alertMessage } from "../utils/helper";

function TaskItem({ task }) {
  const { completedTask, incompletedTask, deleteTask } = useToDo();
  const [isOpenDialog, setisOpenDialog] = useState(false);

  function handleComplete(taskId) {
    if (!task.completed) {
      completedTask(taskId);
      alertMessage("🎉 Great job! You finished a task.", true);
    } else {
      incompletedTask(taskId);
      alertMessage("💪 Don't worry, you can finish it later.", true);
    }
  }

  function handleDelete(taskId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(taskId);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }

  return (
    <div
      className={`p-5 rounded-2xl shadow-md flex flex-col justify-between gap-3 transition hover:scale-[1.02]
                  ${
                    task.completed
                      ? "bg-green-50 border border-green-300"
                      : "bg-yellow-50 border border-yellow-300"
                  }
                `}
    >
      <div className="flex items-center justify-between">
        <h3
          className={`font-semibold text-lg truncate ${
            task.completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {task.title}
        </h3>

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => handleComplete(task.id)}
          className="w-5 h-5 accent-green-600 cursor-pointer"
        />
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
        {task.description}
      </p>

      <div className="flex justify-end items-center text-xs text-gray-500">
        <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="flex justify-between items-center mt-2">
        {task.completed ? (
          <FaCheckCircle className="text-green-600 text-2xl" />
        ) : (
          <FaClock className="text-yellow-500 text-2xl" />
        )}

        <div className="flex gap-2">
          <div>
            <button
              onClick={() => setisOpenDialog(true)}
              className="p-1 text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <AiOutlineEdit size={18} />
            </button>

            <UpdateTaskDialog
              isOpenDialog={isOpenDialog}
              closeDialog={() => setisOpenDialog(false)}
              task={task}
            />
          </div>
          <button
            onClick={() => handleDelete(task.id)}
            className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
          >
            <AiOutlineDelete size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
