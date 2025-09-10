import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ToDoProvider } from "./contexts/ToDoContext";
import { lazy, Suspense } from "react";
import ProtectingRote from "./pages/ProtectingRote";
import Loader from "./components/Loader";
import ToastContainerC from "./components/ToastContainerC";
import PersistentLogin from "./pages/PersistentLogin";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Tasks = lazy(() => import("./pages/Tasks"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <ToDoProvider>
          <ToastContainerC />
          <BrowserRouter>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route element={<PersistentLogin />}>
                  <Route element={<ProtectingRote />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="tasks" element={<Tasks />} />
                  </Route>
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ToDoProvider>
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;
