import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SummaryCard from "./SummaryCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Package,
  Truck,
  ShoppingCart,
  DollarSign,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "../ui/button";

interface OverviewProps {
  summaryData?: {
    totalOrders: number;
    totalProducts: number;
    totalRevenue: number;
    pendingDeliveries: number;
  };
  recentOrdersData?: Array<{
    id: string;
    customer: string;
    products: string[];
    total: number;
    status: string;
    date: string;
  }>;
  salesData?: Array<{
    name: string;
    value: number;
  }>;
}

const Overview = ({
  summaryData = {
    totalOrders: 156,
    totalProducts: 43,
    totalRevenue: 8245,
    pendingDeliveries: 12,
  },
  recentOrdersData = [
    {
      id: "ORD-001",
      customer: "John Doe",
      products: ["Organic Apples", "Fresh Milk"],
      total: 24.99,
      status: "delivered",
      date: "2023-06-15",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      products: ["Whole Grain Bread", "Cheese"],
      total: 18.5,
      status: "out for delivery",
      date: "2023-06-15",
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      products: ["Fresh Vegetables Pack", "Chicken Breast"],
      total: 32.75,
      status: "preparing",
      date: "2023-06-15",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      products: ["Organic Eggs", "Yogurt"],
      total: 15.25,
      status: "pending",
      date: "2023-06-15",
    },
  ],
  salesData = [
    { name: "Mon", value: 1200 },
    { name: "Tue", value: 1800 },
    { name: "Wed", value: 1400 },
    { name: "Thu", value: 2200 },
    { name: "Fri", value: 1900 },
    { name: "Sat", value: 2400 },
    { name: "Sun", value: 1600 },
  ],
}: OverviewProps) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Download Report</Button>
          <Button>Refresh Data</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Orders"
          value={summaryData.totalOrders}
          icon={<ShoppingCart className="h-6 w-6 text-primary" />}
          trend={{ value: 12, isPositive: true }}
        />
        <SummaryCard
          title="Total Products"
          value={summaryData.totalProducts}
          icon={<Package className="h-6 w-6 text-primary" />}
          trend={{ value: 5, isPositive: true }}
        />
        <SummaryCard
          title="Total Revenue"
          value={`$${summaryData.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6 text-primary" />}
          trend={{ value: 8, isPositive: true }}
        />
        <SummaryCard
          title="Pending Deliveries"
          value={summaryData.pendingDeliveries}
          icon={<Truck className="h-6 w-6 text-primary" />}
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sales Chart */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span>Weekly Sales</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Recent Orders</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="processing">Processing</TabsTrigger>
                  <TabsTrigger value="delivered">Delivered</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  {recentOrdersData.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.products.join(", ")}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium">
                          ${order.total.toFixed(2)}
                        </span>
                        <span
                          className={`text-xs ${getStatusColor(order.status)}`}
                        >
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="pending" className="space-y-4">
                  {recentOrdersData
                    .filter((order) => order.status === "pending")
                    .map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {order.customer}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.products.join(", ")}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-medium">
                            ${order.total.toFixed(2)}
                          </span>
                          <span className="text-xs text-yellow-600">
                            PENDING
                          </span>
                        </div>
                      </div>
                    ))}
                </TabsContent>
                <TabsContent value="processing" className="space-y-4">
                  {recentOrdersData
                    .filter((order) =>
                      ["preparing", "out for delivery"].includes(order.status),
                    )
                    .map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {order.customer}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.products.join(", ")}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-medium">
                            ${order.total.toFixed(2)}
                          </span>
                          <span className="text-xs text-blue-600">
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                </TabsContent>
                <TabsContent value="delivered" className="space-y-4">
                  {recentOrdersData
                    .filter((order) => order.status === "delivered")
                    .map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {order.customer}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.products.join(", ")}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-medium">
                            ${order.total.toFixed(2)}
                          </span>
                          <span className="text-xs text-green-600">
                            DELIVERED
                          </span>
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage your product inventory, add new products, or update
              existing ones.
            </p>
            <Button className="w-full">Go to Products</Button>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Delivery Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Assign delivery services to products and manage delivery details.
            </p>
            <Button className="w-full">Manage Deliveries</Button>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Order Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Track orders in different stages and update their status as
              needed.
            </p>
            <Button className="w-full">View Orders</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper function to get status color
const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "text-green-600";
    case "out for delivery":
      return "text-blue-600";
    case "preparing":
      return "text-indigo-600";
    case "pending":
      return "text-yellow-600";
    default:
      return "text-gray-600";
  }
};

export default Overview;
