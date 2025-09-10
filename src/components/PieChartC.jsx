import { useState, useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import NoTasksChart from "./NoTasksChart";

const RADIAN = Math.PI / 180;
const COLORS = {
  completed: "#10B981",
  pending: "#FACC15",
};

const STATUS_ICONS = {
  completed: "✅",
  pending: "⏳",
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if ((percent ?? 0) < 0.05) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      fontSize="14"
      fontWeight="bold"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="drop-shadow-sm"
    >
      {`${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border-none">
        <p className="font-medium flex items-center gap-2">
          {STATUS_ICONS[data.status]} {data.name}
        </p>
        <p className="text-sm text-gray-300">
          {data.value} tasks ({((data.value / data.total) * 100).toFixed(1)}%)
        </p>
      </div>
    );
  }
  return null;
};

export default function TasksPieChart({ status }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const chartData = useMemo(() => {
    if (!status || typeof status !== "object") {
      return [
        { name: "Completed", value: 70, status: "completed", total: 100 },
        { name: "Pending", value: 30, status: "pending", total: 100 },
      ];
    }

    const total = status.total || 0;
    const completed = status.complete || 0;
    const pending = status.pending || 0;

    if (total === 0) {
      return [
        { name: "Completed", value: 70, status: "completed", total: 100 },
        { name: "Pending", value: 30, status: "pending", total: 100 },
      ];
    }

    const data = [];

    if (completed > 0) {
      data.push({
        name: "Completed",
        value: completed,
        status: "completed",
        total: total,
      });
    }

    if (pending > 0) {
      data.push({
        name: "Pending",
        value: pending,
        status: "pending",
        total: total,
      });
    }

    return data.length > 0
      ? data
      : [
          { name: "Completed", value: 70, status: "completed", total: 100 },
          { name: "Pending", value: 30, status: "pending", total: 100 },
        ];
  }, [status]);

  const totalTasks = chartData.reduce((sum, item) => sum + item.value, 0);
  const completionRate =
    totalTasks > 0
      ? ((chartData.find((item) => item.status === "completed")?.value || 0) /
          totalTasks) *
        100
      : 0;

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  const isRealData = status && status.total > 0;

  return (
    <div className="w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
      {status.total !== 0 && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              📊 Completion Rate
            </h2>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Total: {isRealData ? status.total : totalTasks} tasks</span>
              <span>•</span>
              <span
                className={`font-medium ${
                  completionRate >= 70
                    ? "text-green-600 dark:text-green-400"
                    : completionRate >= 50
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {completionRate.toFixed(1)}% Complete
              </span>
            </div>
            {!isRealData && (
              <p className="text-xs text-gray-400 mt-1">(Demo data)</p>
            )}
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={110}
                innerRadius={45}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                animationBegin={0}
                animationDuration={800}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.status}`}
                    fill={COLORS[entry.status] || COLORS.pending}
                    stroke={activeIndex === index ? "#fff" : "none"}
                    strokeWidth={activeIndex === index ? 2 : 0}
                    className="transition-all duration-200 cursor-pointer hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="grid md:grid-cols-2 gap-3 mt-6">
            {chartData.map((entry, index) => (
              <div
                key={entry.status}
                className={`flex items-center justify-center  text-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer
              ${
                activeIndex === index
                  ? "bg-gray-100 dark:bg-gray-900"
                  : "hover:bg-gray-50 dark:hover:bg-gray-900/50"
              }
            `}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(-1)}
              >
                <div className="flex items-center gap-2 ">
                  <span
                    className="w-4 h-4 rounded-full shadow-sm"
                    style={{
                      backgroundColor: COLORS[entry.status] || COLORS.pending,
                    }}
                  ></span>
                  <span className="text-lg">{STATUS_ICONS[entry.status]}</span>
                </div>
                <div className="min-w-0 ">
                  <p className="font-medium text-gray-700 dark:text-gray-300 truncate">
                    {entry.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {entry.value} tasks (
                    {(
                      (entry.value / (isRealData ? status.total : totalTasks)) *
                      100
                    ).toFixed(1)}
                    %)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {status.total === 0 && <NoTasksChart />}
    </div>
  );
}
