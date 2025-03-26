import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, RefreshCw, Download } from "lucide-react";
import KanbanBoard from "./KanbanBoard";
import OrderCard from "./OrderCard";
import OrderDetails from "./OrderDetails";

interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: "pending" | "preparing" | "out-for-delivery" | "delivered";
  timestamp: string;
  address: string;
  phone: string;
}

interface OrderTrackingProps {
  orders?: Order[];
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orders = [] }) => {
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Handle order click to show details
  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Handle order status update
  const handleOrderStatusUpdate = (
    orderId: string,
    source: string,
    destination: string,
  ) => {
    // In a real app, this would update the order status in the database
    console.log(`Order ${orderId} moved from ${source} to ${destination}`);
  };

  // Handle order card status update
  const handleCardStatusUpdate = (id: string, status: string) => {
    // In a real app, this would update the order status in the database
    console.log(`Order ${id} status updated to ${status}`);
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="bg-background p-6 h-full w-full">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Order Tracking
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage customer orders through the delivery process.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Orders Overview</CardTitle>
                <CardDescription>
                  Track and manage all customer orders in one place.
                </CardDescription>
              </div>
              <Tabs
                defaultValue="kanban"
                value={viewMode}
                onValueChange={(value) =>
                  setViewMode(value as "kanban" | "list")
                }
                className="w-[200px]"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="kanban">Kanban</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === "kanban" ? (
              <KanbanBoard
                onOrderMove={handleOrderStatusUpdate}
                onOrderClick={handleOrderClick}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      id={order.id}
                      customerName={order.customer}
                      customerPhone={order.phone}
                      deliveryAddress={order.address}
                      orderDate={new Date(order.timestamp).toLocaleString()}
                      status={order.status}
                      totalAmount={order.total}
                      items={order.items.map((item) => ({
                        name: item,
                        quantity: 1,
                        price: 0, // In a real app, this would come from the order data
                      }))}
                      onViewDetails={() => handleOrderClick(order)}
                      onUpdateStatus={handleCardStatusUpdate}
                    />
                  ))
                ) : (
                  <div className="col-span-full flex justify-center items-center h-64 text-muted-foreground">
                    {searchQuery
                      ? "No orders match your search"
                      : "No orders available"}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <OrderDetails
          isOpen={showOrderDetails}
          onClose={() => setShowOrderDetails(false)}
          orderId={selectedOrder.id}
          customerName={selectedOrder.customer}
          customerPhone={selectedOrder.phone}
          deliveryAddress={selectedOrder.address}
          orderDate={new Date(selectedOrder.timestamp).toLocaleString()}
          orderStatus={selectedOrder.status.replace("-", " ") as any}
          orderItems={selectedOrder.items.map((item, index) => ({
            id: `item-${index}`,
            name: item,
            quantity: 1,
            price: selectedOrder.total / selectedOrder.items.length, // Approximate price
          }))}
        />
      )}
    </div>
  );
};

export default OrderTracking;
