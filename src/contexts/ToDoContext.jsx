import { createContext, useCallback, useReducer } from "react";
import { useAuth } from "../hooks/useAuth";
import { alertMessage } from "../utils/helper";

const ToDoContext = createContext();
const BASE_URL = import.meta.env.VITE_API_URL;

const initialState = {
  tasks: [],
  loading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };
    case "stopLoading":
      return { ...state, loading: false };
    case "tasks/get":
      return { ...state, tasks: action.payload, loading: false, error: "" };
    case "error":
      return { ...state, error: action.payload, loading: false };
    default:
      throw new Error("Unknown Action!");
  }
}

function ToDoProvider({ children }) {
  const { accessToken, refreshToken } = useAuth();
  const [{ tasks, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // helper function
  const fetchWithAuth = useCallback(
    async (url, options = {}) => {
      let res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          ...(options.headers || {}),
        },
      });

      if (res.status === 401) {
        const newToken = await refreshToken();
        if (!newToken) throw new Error("Session expired, please login again.");
        res = await fetch(url, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newToken}`,
            ...(options.headers || {}),
          },
        });
      }

      return res;
    },
    [accessToken, refreshToken]
  );

  // get tasks
  const getTasks = useCallback(async () => {
    try {
      dispatch({ type: "loading" });

      const res = await fetchWithAuth(`${BASE_URL}/api/todos`);

      if (!res.ok) {
        throw new Error("Tasks are not available right now");
      }

      const data = await res.json();
      dispatch({ type: "tasks/get", payload: data });
    } catch (err) {
      alertMessage(
        "⚠️ Tasks are not available right now. Please refresh!",
        false
      );
      dispatch({ type: "error", payload: err.message });
    }
  }, [fetchWithAuth]);

  // add new task
  async function addTasks(title, description) {
    try {
      dispatch({ type: "loading" });

      const res = await fetchWithAuth(`${BASE_URL}/api/todos`, {
        method: "POST",
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error("We couldn’t add your task");
      }

      await getTasks();
    } catch (err) {
      alertMessage(
        "❌ Oops! We couldn’t add your task. Please try again.",
        false
      );
      dispatch({ type: "error", payload: err.message });
    }
  }

  // make task completed
  async function completedTask(taskId) {
    try {
      dispatch({ type: "loading" });

      const res = await fetchWithAuth(
        `${BASE_URL}/api/todos/${taskId}/complete`,
        {
          method: "PATCH",
        }
      );

      if (!res.ok) {
        throw new Error("Couldn't complete the task");
      }

      await getTasks();
    } catch (err) {
      alertMessage(
        "❌ Oops! Couldn't complete the task. Please try again.",
        false
      );
      dispatch({ type: "error", payload: err.message });
    }
  }

  // make task incompleted
  async function incompletedTask(taskId) {
    try {
      dispatch({ type: "loading" });

      const res = await fetchWithAuth(
        `${BASE_URL}/api/todos/${taskId}/incomplete`,
        {
          method: "PATCH",
        }
      );

      if (!res.ok) {
        throw new Error("Couldn't mark the task as incomplete");
      }
      await getTasks();
    } catch (err) {
      alertMessage(
        "❌ Oops! Couldn't mark the task as incomplete. Please try again.",
        false
      );
      dispatch({ type: "error", payload: err.message });
    }
  }

  // delete task
  async function deleteTask(taskId) {
    try {
      dispatch({ type: "loading" });

      const res = await fetchWithAuth(`${BASE_URL}/api/todos/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Couldn't delete the task");
      }
      await getTasks();
    } catch (err) {
      alertMessage(
        "❌ Oops! Couldn't delete the task. Please try again.",
        false
      );
      dispatch({ type: "error", payload: err.message });
    }
  }

  // update task
  async function updateTask(taskId, title, description) {
    try {
      dispatch({ type: "loading" });

      const res = await fetchWithAuth(`${BASE_URL}/api/todos/${taskId}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error("Couldn't update the task");
      }
      await getTasks();
    } catch (err) {
      alertMessage(
        "❌ Oops! Couldn't update the task. Please try again.",
        false
      );
      dispatch({ type: "error", payload: err.message });
    }
  }

  // search
  const searchTasks = useCallback(
    async (term) => {
      try {
        dispatch({ type: "loading" });

        const res = await fetchWithAuth(
          `${BASE_URL}/api/todos/search?term=${term}`
        );

        if (!res.ok) {
          throw new Error("Couldn't search for tasks");
        }
        const data = await res.json();
        dispatch({ type: "tasks/get", payload: data });
      } catch (err) {
        alertMessage(
          "🔍 Oops! Couldn't search for tasks. Please try again.",
          false
        );
        dispatch({ type: "error", payload: err.message });
      }
    },
    [fetchWithAuth]
  );

  // get user status
  const getStatus = useCallback(async () => {
    try {
      dispatch({ type: "loading" });

      const res = await fetchWithAuth(`${BASE_URL}/api/todos/stats`);

      if (!res.ok) {
        throw new Error("Failed to get user status");
      }
      const data = await res.json();
      dispatch({ type: "stopLoading" });
      return data;
    } catch (err) {
      alertMessage("⚠️ Failed to get user status. Please try again.", false);
      dispatch({ type: "error", payload: err.message });
    }
  }, [fetchWithAuth]);

  return (
    <ToDoContext.Provider
      value={{
        tasks,
        loading,
        error,
        getTasks,
        addTasks,
        completedTask,
        incompletedTask,
        deleteTask,
        updateTask,
        searchTasks,
        getStatus,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
}

export { ToDoProvider, ToDoContext };
