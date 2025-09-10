import { useAuth } from "../hooks/useAuth";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import img from "../assets/profile.png";

export default function ProfileDialog({ isOpenDialog, closeDialog }) {
  const { user, logout } = useAuth();

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
          <div className="fixed inset-0 bg-black/40" />
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
            <DialogPanel className="w-full max-w-sm rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl relative">
              <button
                onClick={closeDialog}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <AiOutlineClose size={22} />
              </button>

              <DialogTitle className="text-xl font-bold text-center text-gray-800 dark:text-gray-100">
                User Profile
              </DialogTitle>

              <div className="flex flex-col items-center mt-6 gap-3">
                <img
                  src={img}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border border-blue-500 p-1 object-cover"
                />
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => {
                    logout();
                    closeDialog();
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
                >
                  <AiOutlineLogout size={18} />
                  Logout
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
