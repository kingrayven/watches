import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChartContainer from "./ChartContainer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface AnalyticsOverviewProps {
  className?: string;
}

const AnalyticsOverview = ({ className = "" }: AnalyticsOverviewProps) => {
  const [activeTab, setActiveTab] = useState("daily");

  // Mock data for daily orders chart
  const dailyOrdersData = [
    { name: "Mon", orders: 12 },
    { name: "Tue", orders: 19 },
    { name: "Wed", orders: 15 },
    { name: "Thu", orders: 22 },
    { name: "Fri", orders: 30 },
    { name: "Sat", orders: 28 },
    { name: "Sun", orders: 25 },
  ];

  // Mock data for popular products chart
  const popularProductsData = [
    { name: "Organic Vegetables", value: 35 },
    { name: "Fresh Fruits", value: 25 },
    { name: "Dairy Products", value: 20 },
    { name: "Bakery Items", value: 15 },
    { name: "Beverages", value: 5 },
  ];

  // Mock data for delivery performance
  const deliveryPerformanceData = [
    { name: "Mon", onTime: 90, delayed: 10 },
    { name: "Tue", onTime: 85, delayed: 15 },
    { name: "Wed", onTime: 95, delayed: 5 },
    { name: "Thu", onTime: 88, delayed: 12 },
    { name: "Fri", onTime: 92, delayed: 8 },
    { name: "Sat", onTime: 80, delayed: 20 },
    { name: "Sun", onTime: 85, delayed: 15 },
  ];

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  // Mock data for revenue metrics
  const revenueMetrics = [
    {
      title: "Total Revenue",
      value: "$12,845",
      change: 12.5,
      trend: "up",
    },
    {
      title: "Average Order Value",
      value: "$42.50",
      change: 8.3,
      trend: "up",
    },
    {
      title: "Delivery Completion Rate",
      value: "94%",
      change: 2.1,
      trend: "up",
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      change: 0.2,
      trend: "up",
    },
  ];

  const handleExport = (type: "csv" | "pdf" | "print") => {
    // Mock export functionality
    console.log(`Exporting as ${type}`);
  };

  const handleFilterChange = (value: string) => {
    // Mock filter change functionality
    console.log(`Filter changed to ${value}`);
  };

  return (
    <div className={`p-6 space-y-6 bg-gray-50 ${className}`}>
      <h1 className="text-2xl font-bold">Analytics Overview</h1>

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {revenueMetrics.map((metric, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">{metric.title}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-2xl font-bold">{metric.value}</p>
                <div
                  className={`flex items-center text-sm ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}
                >
                  {metric.trend === "up" ? (
                    <ArrowUpIcon className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4 mr-1" />
                  )}
                  {metric.change}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Tabs */}
      <Tabs
        defaultValue="daily"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="daily">Daily Orders</TabsTrigger>
          <TabsTrigger value="popular">Popular Products</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-0">
          <ChartContainer
            title="Daily Orders"
            onExport={handleExport}
            onFilterChange={handleFilterChange}
          >
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={dailyOrdersData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#8884d8" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>

        <TabsContent value="popular" className="mt-0">
          <ChartContainer
            title="Popular Products"
            onExport={handleExport}
            filterOptions={[
              { label: "All Categories", value: "all" },
              { label: "Food & Beverages", value: "food" },
              { label: "Household Items", value: "household" },
            ]}
            onFilterChange={handleFilterChange}
          >
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={popularProductsData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {popularProductsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>

        <TabsContent value="delivery" className="mt-0">
          <ChartContainer
            title="Delivery Performance"
            onExport={handleExport}
            filterOptions={[
              { label: "All Services", value: "all" },
              { label: "Express Delivery", value: "express" },
              { label: "Standard Delivery", value: "standard" },
            ]}
            onFilterChange={handleFilterChange}
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={deliveryPerformanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="onTime"
                  stroke="#4ade80"
                  name="On-Time Delivery %"
                />
                <Line
                  type="monotone"
                  dataKey="delayed"
                  stroke="#f87171"
                  name="Delayed Delivery %"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsOverview;
