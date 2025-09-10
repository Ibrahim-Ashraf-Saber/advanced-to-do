import { useState, useEffect } from "react";
import { useToDo } from "../hooks/useToDo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import NoTasks from "../components/NoTasks";
import TaskItem from "../components/TaskItem";
import AddTaskDialog from "../components/AddTaskDialog";
import TaskItemSkeleton from "../components/TaskItemSkeleton";
import { AiOutlinePlus } from "react-icons/ai";

function Tasks() {
  const { tasks, loading, getTasks } = useToDo();
  const [isOpenDialog, setisOpenDialog] = useState(false);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <div className="flex relative flex-col min-h-dvh">
      <Navbar />

      <main className="flex-1 bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              All Tasks
            </h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <SearchBar />
            </div>
          </div>

          <div className="flex justify-center md:justify-end mb-6">
            <button
              onClick={() => setisOpenDialog(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              <AiOutlinePlus size={20} />
              Add Task
            </button>

            <AddTaskDialog
              isOpenDialog={isOpenDialog}
              closeDialog={() => setisOpenDialog(false)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }, (_, i) => <TaskItemSkeleton key={i} />)
            ) : !tasks.length ? (
              <NoTasks />
            ) : (
              tasks.map((task) => <TaskItem task={task} key={task.id} />)
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Tasks;
