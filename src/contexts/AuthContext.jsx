import { createContext, useReducer, useCallback } from "react";
import { alertMessage } from "../utils/helper";

const AuthContext = createContext();
const BASE_URL = import.meta.env.VITE_API_URL;

const initialState = {
  user: null,
  accessToken: null,
  isAuth: false,
  expiresIn: null,
  error: "",
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true, error: "" };
    case "login":
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        isAuth: true,
        expiresIn: action.payload.expiresIn,
        error: "",
        loading: false,
      };
    case "logout":
      return {
        ...state,
        user: null,
        accessToken: null,
        isAuth: false,
        expiresIn: null,
        error: "",
        loading: false,
      };
    case "error":
      return { ...state, error: action.payload, loading: false };
    default:
      throw new Error("Unknown Action!");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuth, loading, error, accessToken }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // register
  async function register(email, name, password) {
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        body: JSON.stringify({ email, name, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok || data.error)
        throw new Error(data.message || "Registration failed");

      const user = { name: data.name, email: data.email };
      const accessToken = data.accessToken;
      const expiresIn = data.expiresIn;

      dispatch({ type: "login", payload: { user, accessToken, expiresIn } });
      localStorage.setItem("isAuth", true);
      alertMessage("🎉 Registered successfully!", true);
    } catch (err) {
      alertMessage(err.message, false);
      dispatch({ type: "error", payload: err.message });
    }
  }

  // login
  async function login(email, password) {
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      const user = { name: data.name, email: data.email };
      const accessToken = data.accessToken;
      const expiresIn = data.expiresIn;

      dispatch({ type: "login", payload: { user, accessToken, expiresIn } });
      localStorage.setItem("isAuth", true);
      alertMessage("✅ Logged in successfully!", true);
    } catch (err) {
      alertMessage(err.message, false);
      dispatch({ type: "error", payload: err.message });
    }
  }

  // logout
  const logout = useCallback(async () => {
    try {
      dispatch({ type: "loading" });

      await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (err) {
      dispatch({ type: "error", payload: err.message });
    } finally {
      dispatch({ type: "logout" });
      localStorage.removeItem("isAuth");
      alertMessage("👋 Logged out successfully!", true);
    }
  }, []);

  // refresh token
  const refreshToken = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok || data.error)
        throw new Error(data.message || "Token refresh failed");

      const user = { name: data.name, email: data.email };
      const newAccessToken = data.accessToken;
      const expiresIn = data.expiresIn;

      dispatch({
        type: "login",
        payload: { user, accessToken: newAccessToken, expiresIn },
      });
      return newAccessToken;
    } catch {
      await logout();
      alertMessage(
        "✨ For your security, we signed you out. Please login again to continue.",
        true
      );
    }
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        accessToken,
        loading,
        error,
        register,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
