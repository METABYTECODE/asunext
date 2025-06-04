"use client";
import { useState, useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

// Регистрация компонентов ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("monthly");
  const [chartType, setChartType] = useState("line");
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Данные
  const monthlyData = {
    labels: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн"],
    visits: [3450, 4200, 5200, 4800, 6100, 7300],
    conversions: [2100, 2900, 3800, 3400, 4200, 5100],
    revenue: [125000, 175000, 225000, 195000, 265000, 315000],
  };

  const trafficSources = [
    { name: "Organic", value: 45320, color: "bg-indigo-600" },
    { name: "Direct", value: 25120, color: "bg-violet-600" },
    { name: "Social", value: 18450, color: "bg-rose-500" },
    { name: "Email", value: 12560, color: "bg-cyan-500" },
  ];

  const topPages = [
    { page: "/", visitors: 12500 },
    { page: "/products", visitors: 8540 },
    { page: "/blog", visitors: 6230 },
    { page: "/contact", visitors: 4210 },
  ];

  // Настройки графиков
  const lineChartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: "Посетители",
        data: monthlyData.visits,
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Конверсии",
        data: monthlyData.conversions,
        borderColor: "#f43f5e",
        backgroundColor: "rgba(244, 63, 94, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: "Доход ($)",
        data: monthlyData.revenue,
        backgroundColor: "rgba(16, 185, 129, 0.6)",
        borderColor: "#10b981",
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: trafficSources.map((source) => source.name),
    datasets: [
      {
        data: trafficSources.map((source) => source.value),
        backgroundColor: [
          "rgba(99, 102, 241, 0.7)",
          "rgba(139, 92, 246, 0.7)",
          "rgba(244, 63, 94, 0.7)",
          "rgba(6, 182, 212, 0.7)",
        ],
        borderWidth: 0,
      },
    ],
  };

  // Функции для скачивания графиков
  const downloadChart = (ref) => {
    if (ref.current) {
      const link = document.createElement("a");
      link.download = `chart-${new Date().toISOString()}.png`;
      link.href = ref.current.toBase64Image();
      link.click();
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Заголовок и фильтры */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Аналитика
        </h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
          <p className="text-gray-500 dark:text-gray-400">
            Обзор ключевых показателей за последние 6 месяцев
          </p>
          <div className="flex flex-wrap gap-2">
            {["daily", "weekly", "monthly"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timeRange === range
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {range === "daily" && "День"}
                {range === "weekly" && "Неделя"}
                {range === "monthly" && "Месяц"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ключевые метрики */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Всего посетителей"
          value="24,532"
          change="+12.5%"
          isPositive={true}
          target="30,000"
          progress={82}
        />
        <MetricCard
          title="Конверсия"
          value="3.2%"
          change="+0.4%"
          isPositive={true}
          target="3.5%"
          progress={91}
        />
        <MetricCard
          title="Средняя сессия"
          value="4m 23s"
          change="+15s"
          isPositive={true}
          target="5m"
          progress={88}
        />
        <MetricCard
          title="Отказы"
          value="42%"
          change="-3%"
          isPositive={false}
          target="35%"
          progress={83}
        />
      </div>

      {/* Основные графики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Трафик и конверсии" isLoaded={isLoaded}>
          <div className="flex justify-end mb-2 gap-2">
            <button
              onClick={() => setChartType("line")}
              className={`px-2 py-1 text-xs rounded ${
                chartType === "line"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              Линия
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-2 py-1 text-xs rounded ${
                chartType === "bar"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              Столбцы
            </button>
            <button
              onClick={() => downloadChart(lineChartRef)}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Скачать
            </button>
          </div>
          <div className="h-64 sm:h-72 md:h-80">
            {chartType === "line" ? (
              <Line
                ref={lineChartRef}
                data={lineChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "top" },
                    tooltip: {
                      mode: "index",
                      intersect: false,
                      backgroundColor: "#1F2937",
                      titleColor: "#E5E7EB",
                      bodyColor: "#D1D5DB",
                      borderColor: "#4B5563",
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: { color: "rgba(0, 0, 0, 0.05)" },
                    },
                    x: { grid: { display: false } },
                  },
                }}
              />
            ) : (
              <Bar
                ref={lineChartRef}
                data={{
                  labels: lineChartData.labels,
                  datasets: [
                    lineChartData.datasets[0],
                    lineChartData.datasets[1],
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "top" },
                    tooltip: {
                      mode: "index",
                      intersect: false,
                      backgroundColor: "#1F2937",
                      titleColor: "#E5E7EB",
                      bodyColor: "#D1D5DB",
                      borderColor: "#4B5563",
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: { color: "rgba(0, 0, 0, 0.05)" },
                    },
                    x: { grid: { display: false } },
                  },
                }}
              />
            )}
          </div>
        </ChartCard>

        <ChartCard title="Доход по месяцам" isLoaded={isLoaded}>
          <div className="flex justify-end mb-2">
            <button
              onClick={() => downloadChart(barChartRef)}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Скачать
            </button>
          </div>
          <div className="h-64 sm:h-72 md:h-80">
            <Bar
              ref={barChartRef}
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: "#1F2937",
                    titleColor: "#E5E7EB",
                    bodyColor: "#D1D5DB",
                    borderColor: "#4B5563",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { color: "rgba(0, 0, 0, 0.05)" },
                    ticks: {
                      callback: (value) => `$${value / 1000}k`,
                    },
                  },
                  x: { grid: { display: false } },
                },
              }}
            />
          </div>
        </ChartCard>
      </div>

      {/* Дополнительные метрики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Источники трафика" isLoaded={isLoaded}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-48 h-48 md:w-56 md:h-56">
              <Doughnut
                data={doughnutData}
                options={{
                  cutout: "70%",
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 space-y-3 w-full md:w-auto">
              {trafficSources.map((source) => (
                <div
                  key={source.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${source.color} mr-2`}
                    ></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {source.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {((source.value / 101450) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Топ страницы" isLoaded={isLoaded}>
          <div className="space-y-4">
            {topPages.map((page) => (
              <div key={page.page} className="flex items-center">
                <div className="w-32 truncate text-gray-600 dark:text-gray-300 text-sm">
                  {page.page}
                </div>
                <div className="flex-1 mx-2">
                  <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                      className="absolute top-0 left-0 h-2 bg-indigo-600 rounded-full"
                      style={{
                        width: `${(page.visitors / 12500) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {new Intl.NumberFormat("ru").format(page.visitors)}
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

// Компоненты
const MetricCard = ({
  title,
  value,
  change,
  isPositive,
  target,
  progress,
}: {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  target: string;
  progress: number;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <div className="mt-2 flex items-baseline">
        <span className="text-2xl font-semibold text-gray-900 dark:text-white">
          {value}
        </span>
        <span
          className={`ml-2 text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Цель: {target}</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const ChartCard = ({
  title,
  children,
  isLoaded,
}: {
  title: string;
  children: React.ReactNode;
  isLoaded?: boolean;
}) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
};
