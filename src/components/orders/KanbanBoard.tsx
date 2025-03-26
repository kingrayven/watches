import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface Column {
  id: string;
  title: string;
  color: string;
  orders: Order[];
}

interface KanbanBoardProps {
  columns?: Column[];
  onOrderMove?: (orderId: string, source: string, destination: string) => void;
  onOrderClick?: (order: Order) => void;
}

const KanbanBoard = ({
  columns = defaultColumns,
  onOrderMove = () => {},
  onOrderClick = () => {},
}: KanbanBoardProps) => {
  const [boardColumns, setBoardColumns] = useState<Column[]>(columns);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    // Dropped outside the list
    if (!destination) return;

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find source and destination columns
    const sourceColumn = boardColumns.find(
      (col) => col.id === source.droppableId,
    );
    const destColumn = boardColumns.find(
      (col) => col.id === destination.droppableId,
    );

    if (!sourceColumn || !destColumn) return;

    // Moving within the same column
    if (source.droppableId === destination.droppableId) {
      const newOrders = Array.from(sourceColumn.orders);
      const [movedOrder] = newOrders.splice(source.index, 1);
      newOrders.splice(destination.index, 0, movedOrder);

      const newColumns = boardColumns.map((col) => {
        if (col.id === sourceColumn.id) {
          return { ...col, orders: newOrders };
        }
        return col;
      });

      setBoardColumns(newColumns);
    } else {
      // Moving from one column to another
      const sourceOrders = Array.from(sourceColumn.orders);
      const destOrders = Array.from(destColumn.orders);
      const [movedOrder] = sourceOrders.splice(source.index, 1);

      // Update the status of the order
      const updatedOrder = {
        ...movedOrder,
        status: destColumn.id as
          | "pending"
          | "preparing"
          | "out-for-delivery"
          | "delivered",
      };

      destOrders.splice(destination.index, 0, updatedOrder);

      const newColumns = boardColumns.map((col) => {
        if (col.id === sourceColumn.id) {
          return { ...col, orders: sourceOrders };
        }
        if (col.id === destColumn.id) {
          return { ...col, orders: destOrders };
        }
        return col;
      });

      setBoardColumns(newColumns);
      onOrderMove(draggableId, source.droppableId, destination.droppableId);
    }
  };

  const refreshBoard = () => {
    // In a real app, this would fetch the latest data from the server
    console.log("Refreshing board...");
  };

  return (
    <div className="bg-background p-4 h-full w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Tracking Board</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshBoard}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(100vh-180px)]">
          {boardColumns.map((column) => (
            <div key={column.id} className="flex flex-col h-full">
              <div
                className={cn(
                  "px-4 py-2 rounded-t-lg font-medium text-white",
                  column.color,
                )}
              >
                <div className="flex justify-between items-center">
                  <h2>{column.title}</h2>
                  <span className="bg-white bg-opacity-20 text-white px-2 py-1 rounded-full text-xs">
                    {column.orders.length}
                  </span>
                </div>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cn(
                      "flex-1 overflow-y-auto p-2 rounded-b-lg",
                      snapshot.isDraggingOver ? "bg-accent" : "bg-muted/30",
                    )}
                  >
                    {column.orders.map((order, index) => (
                      <Draggable
                        key={order.id}
                        draggableId={order.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-3"
                            onClick={() => onOrderClick(order)}
                          >
                            <Card
                              className={cn(
                                "cursor-pointer hover:shadow-md transition-shadow",
                                snapshot.isDragging ? "shadow-lg" : "",
                              )}
                            >
                              <CardHeader className="p-4 pb-2">
                                <CardTitle className="text-sm font-medium flex justify-between">
                                  <span>Order #{order.id.slice(-4)}</span>
                                  <span className="text-muted-foreground text-xs">
                                    {new Date(
                                      order.timestamp,
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="p-4 pt-0">
                                <div className="text-sm mb-2">
                                  {order.customer}
                                </div>
                                <div className="text-xs text-muted-foreground mb-2 truncate">
                                  {order.items.length} items · $
                                  {order.total.toFixed(2)}
                                </div>
                                <div className="text-xs text-muted-foreground truncate">
                                  {order.address}
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

// Default mock data
const defaultColumns: Column[] = [
  {
    id: "pending",
    title: "Pending",
    color: "bg-yellow-500",
    orders: [
      {
        id: "order-1",
        customer: "John Doe",
        items: ["Organic Apples (2kg)", "Whole Wheat Bread"],
        total: 15.99,
        status: "pending",
        timestamp: new Date().toISOString(),
        address: "123 Main St, Anytown",
        phone: "(555) 123-4567",
      },
      {
        id: "order-2",
        customer: "Jane Smith",
        items: ["Free Range Eggs", "Organic Milk", "Cheese"],
        total: 22.5,
        status: "pending",
        timestamp: new Date().toISOString(),
        address: "456 Oak Ave, Somewhere",
        phone: "(555) 987-6543",
      },
    ],
  },
  {
    id: "preparing",
    title: "Preparing",
    color: "bg-blue-500",
    orders: [
      {
        id: "order-3",
        customer: "Robert Johnson",
        items: ["Fresh Salmon Fillet", "Asparagus Bundle", "Lemon"],
        total: 32.75,
        status: "preparing",
        timestamp: new Date().toISOString(),
        address: "789 Pine Rd, Elsewhere",
        phone: "(555) 456-7890",
      },
    ],
  },
  {
    id: "out-for-delivery",
    title: "Out for Delivery",
    color: "bg-purple-500",
    orders: [
      {
        id: "order-4",
        customer: "Emily Davis",
        items: ["Organic Chicken", "Sweet Potatoes", "Broccoli"],
        total: 28.99,
        status: "out-for-delivery",
        timestamp: new Date().toISOString(),
        address: "321 Maple Dr, Nowhere",
        phone: "(555) 234-5678",
      },
    ],
  },
  {
    id: "delivered",
    title: "Delivered",
    color: "bg-green-500",
    orders: [
      {
        id: "order-5",
        customer: "Michael Wilson",
        items: ["Avocados (4)", "Tortilla Chips", "Salsa"],
        total: 18.25,
        status: "delivered",
        timestamp: new Date().toISOString(),
        address: "654 Cedar Ln, Anywhere",
        phone: "(555) 876-5432",
      },
      {
        id: "order-6",
        customer: "Sarah Brown",
        items: ["Pasta", "Tomato Sauce", "Parmesan Cheese"],
        total: 12.99,
        status: "delivered",
        timestamp: new Date().toISOString(),
        address: "987 Birch St, Someplace",
        phone: "(555) 345-6789",
      },
    ],
  },
];

export default KanbanBoard;
