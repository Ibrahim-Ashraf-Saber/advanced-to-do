import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import img from "../assets/login.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuth, login, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/dashboard");
  }, [isAuth, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <div className="flex relative flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      {loading && <Loader />}

      <main className="flex-1 flex flex-col-reverse md:flex-row items-center justify-center gap-10 px-6 md:px-16 py-10">
        <div className="md:flex-1 max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center md:text-left transition-colors duration-300">
            Login to Your Account
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email-address-icon"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200 transition-colors duration-300"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email-address-icon"
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-20 outline-0"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200 transition-colors duration-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200 outline-0"
                placeholder="••••••••"
                required
                minLength={6}
                maxLength={100}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 cursor-pointer bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-600 gap-1 dark:text-gray-300 mt-4 text-center flex justify-center md:text-left">
            Don't have an account?
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <div className="hidden lg:flex flex-1 max-w-lg w-full justify-center">
          <img
            src={img}
            alt="Login Illustration"
            className="max-w-[80%] h-auto object-contain"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
