import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToDo } from "../hooks/useToDo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import PieChartC from "../components/PieChartC";
import Welcome from "../components/Welcome";
import DashboardNumbers from "../components/DashboardNumbers";
import NoTasksChart from "../components/NoTasksChart";
import DashbordPrograss from "../components/DashbordPrograss";

function Dashboard() {
  const { user } = useAuth();
  const { getStatus, loading } = useToDo();
  const [status, setStauts] = useState({ totalTodos: 0, completedTodos: 0 });
  const pending = status?.totalTodos - status?.completedTodos;

  useEffect(() => {
    async function fun() {
      setStauts(await getStatus());
    }

    fun();
  }, [getStatus]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      {loading && <Loader />}

      <div className="flex-1 p-10 space-y-10">
        <Welcome name={user?.name} />

        <DashboardNumbers
          status={{
            total: status.totalTodos,
            complete: status.completedTodos,
            pending,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col items-center">
            {status.totalTodos === 0 ? (
              <NoTasksChart />
            ) : (
              <DashbordPrograss
                name={user.name}
                status={{
                  total: status.totalTodos,
                  complete: status.completedTodos,
                  pending,
                }}
              />
            )}
          </div>

          <PieChartC
            status={{
              total: status.totalTodos,
              complete: status.completedTodos,
              pending,
            }}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
