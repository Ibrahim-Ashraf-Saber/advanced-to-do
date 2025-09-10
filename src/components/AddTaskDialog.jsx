import { useToDo } from "../hooks/useToDo";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { alertMessage } from "../utils/helper";

export default function AddTaskDialog({ isOpenDialog, closeDialog }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { addTasks } = useToDo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    addTasks(title, description);
    setTitle("");
    setDescription("");
    closeDialog();
    alertMessage("🚀 Task created, let’s get it done!", true);
  };

  return (
    <Transition appear show={isOpenDialog} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeDialog}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl">
              <DialogTitle className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Add New Task
              </DialogTitle>

              <form
                className="mt-4 flex flex-col gap-4"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Task title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <textarea
                  placeholder="Task description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeDialog}
                    className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                  >
                    <AiOutlinePlus size={18} />
                    Add
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
