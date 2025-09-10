function Footer() {
  return (
    <footer className="w-full bg-gray-200 dark:bg-gray-950 text-gray-800 dark:text-gray-300 py-6 text-center transition-colors">
      <p className="text-sm">
        Made With <span className="text-red-500">❤️</span> by{" "}
        <a
          href="https://www.linkedin.com/in/ibrahim-ashraf-924520259/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition font-medium"
        >
          Ibrahim Ashraf
        </a>
        {", "}
        <a
          href="https://www.linkedin.com/in/ahmed-walid-b13985321/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition font-medium"
        >
          Ahmed Walid
        </a>
      </p>
    </footer>
  );
}

export default Footer;
