import { Link } from "react-router-dom";
import notFoundImg from "../assets/notFound.svg";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6">
      <img
        src={notFoundImg}
        loading="lazy"
        alt="Page Not Found"
        className="w-[300px] sm:w-[400px] mb-8"
      />
      <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
        Page Not Found
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-amber-400 hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-400 text-white rounded-lg shadow-md transition"
      >
        Back To Home
      </Link>
    </div>
  );
}

export default PageNotFound;
