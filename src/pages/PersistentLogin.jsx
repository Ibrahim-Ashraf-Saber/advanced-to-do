import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";

function PersistentLogin() {
  const { loading, accessToken, refreshToken } = useAuth();
  const refreshed = useRef(false);
  const hasRefreshToken = localStorage.getItem("isAuth");

  useEffect(() => {
    if (!accessToken && !refreshed.current && hasRefreshToken) {
      refreshed.current = true;
      refreshToken();
    }
  }, [accessToken, refreshToken, hasRefreshToken]);

  return loading ? <Loader /> : <Outlet />;
}

export default PersistentLogin;
