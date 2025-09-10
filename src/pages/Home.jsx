import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img from "../assets/landing.svg";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="flex-1 flex flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 gap-10 lg:ml-20">
        <div className="flex-1 flex flex-col gap-5 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="text-blue-500">TO</span>
            <span className="text-gray-800 dark:text-gray-100">DO</span> App
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl md:w-[90%] lg:w-[80%] mx-auto lg:mx-0 leading-relaxed">
            Simplify your tasks, stay organized, and boost your productivity
            with our clean and modern ToDo app.
          </p>
          <Link
            to="dashboard"
            className="w-fit mx-auto mb-5 lg:mx-0 mt-6 px-6 sm:px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base md:text-lg rounded-xl shadow-md transition"
          >
            Start Now
          </Link>
        </div>

        <div className="w-full lg:w-[50%] flex justify-center">
          <img
            src={img}
            alt="Landing"
            loading="lazy"
            className="w-[75%] sm:w-[60%] md:w-[65%] lg:w-[80%] drop-shadow-xl"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
