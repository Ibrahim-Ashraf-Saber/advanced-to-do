import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDarkMode } from "../hooks/useDarkMode";
import { useAuth } from "../hooks/useAuth";
import { HiMenu, HiX, HiMoon, HiSun } from "react-icons/hi";
import Profile from "./Profile";
import Logo from "./Logo";

function Navbar() {
  const [isOpenDialog, setisOpenDialog] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();
  const { isAuth } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 md:px-10 py-6 shadow-md bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 relative z-50">
      <Logo />

      <ul className="hidden md:flex items-center gap-10 text-lg font-medium">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-blue-500 ${
                isActive
                  ? "text-blue-500 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-blue-500 ${
                isActive
                  ? "text-blue-500 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            Tasks
          </NavLink>
        </li>
        <li className="flex items-center gap-5">
          {isAuth ? (
            <Profile />
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 bg-blue-500 hover:bg-blue-600 transition rounded-lg text-white shadow-md"
            >
              Login
            </Link>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>
        </li>
      </ul>

      <button
        className="md:hidden text-gray-700 dark:text-gray-200"
        onClick={() => setisOpenDialog(!isOpenDialog)}
      >
        {isOpenDialog ? <HiX size={28} /> : <HiMenu size={28} />}
      </button>

      {isOpenDialog && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-950 shadow-md md:hidden">
          <ul className="flex flex-col items-center gap-6 py-6 text-lg font-medium">
            <li>
              <NavLink
                to="/dashboard"
                onClick={() => setisOpenDialog(false)}
                className={({ isActive }) =>
                  `transition-colors duration-200 hover:text-blue-500 ${
                    isActive
                      ? "text-blue-500 font-semibold"
                      : "text-gray-700 dark:text-gray-300"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks"
                onClick={() => setisOpenDialog(false)}
                className={({ isActive }) =>
                  `transition-colors duration-200 hover:text-blue-500 ${
                    isActive
                      ? "text-blue-500 font-semibold"
                      : "text-gray-700 dark:text-gray-300"
                  }`
                }
              >
                Tasks
              </NavLink>
            </li>
            <li>
              {isAuth ? (
                <Profile />
              ) : (
                <Link
                  to="/login"
                  onClick={() => setisOpenDialog(false)}
                  className="px-5 py-2 bg-blue-500 hover:bg-blue-600 transition rounded-lg text-white shadow-md"
                >
                  Login
                </Link>
              )}
            </li>

            <li>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                {darkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
