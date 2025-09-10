import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="text-3xl font-extrabold tracking-wide">
      <span className="text-blue-500">TO</span>
      <span className="text-gray-800 dark:text-gray-200">DO</span>
    </Link>
  );
}

export default Logo;
