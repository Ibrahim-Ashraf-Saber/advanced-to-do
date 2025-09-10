import { useState } from "react";
import { useToDo } from "../hooks/useToDo";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const { searchTasks, getTasks, loading } = useToDo();

  function handleSearch() {
    if (search.trim()) {
      searchTasks(search.trim());
    }
  }

  function handleClear() {
    setSearch("");
    getTasks();
  }

  return (
    <div className="flex w-full sm:w-auto relative">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        disabled={loading}
        className="w-full pr-20 pl-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />

      {search && (
        <button
          onClick={handleClear}
          className="absolute right-12 top-0 px-2 h-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center justify-center"
        >
          <FaTimes size={14} />
        </button>
      )}

      <button
        onClick={handleSearch}
        disabled={loading || !search.trim()}
        className="cursor-pointer absolute right-0 top-0 px-4 h-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-r-lg flex items-center justify-center"
      >
        <FaSearch size={16} />
      </button>
    </div>
  );
}
