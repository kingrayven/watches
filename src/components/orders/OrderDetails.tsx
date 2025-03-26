import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import {
  Phone,
  Mail,
  MapPin,
  Package,
  Truck,
  Clock,
  Calendar,
  DollarSign,
  AlertCircle,
} from "lucide-react";

interface OrderDetailsProps {
  isOpen?: boolean;
  onClose?: () => void;
  orderId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  orderDate?: string;
  orderStatus?:
    | "pending"
    | "preparing"
    | "out for delivery"
    | "delivered"
    | "cancelled";
  orderItems?: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
  deliveryService?: {
    name: string;
    estimatedTime: string;
    cost: number;
  };
  paymentMethod?: string;
  paymentStatus?: "paid" | "pending" | "failed";
  notes?: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  isOpen = true,
  onClose = () => {},
  orderId = "ORD-12345",
  customerName = "John Doe",
  customerEmail = "john.doe@example.com",
  customerPhone = "+1 (555) 123-4567",
  deliveryAddress = "123 Main St, Anytown, CA 94321",
  orderDate = "2023-06-15 14:30",
  orderStatus = "preparing",
  orderItems = [
    {
      id: "1",
      name: "Organic Vegetables Bundle",
      quantity: 1,
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=300&q=80",
    },
    {
      id: "2",
      name: "Fresh Baked Bread",
      quantity: 2,
      price: 5.99,
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80",
    },
    {
      id: "3",
      name: "Artisan Cheese Selection",
      quantity: 1,
      price: 18.5,
      image:
        "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=300&q=80",
    },
  ],
  deliveryService = {
    name: "Express Delivery",
    estimatedTime: "30-45 minutes",
    cost: 5.99,
  },
  paymentMethod = "Credit Card",
  paymentStatus = "paid",
  notes = "",
}) => {
  const [status, setStatus] = useState(orderStatus);
  const [customerNotes, setCustomerNotes] = useState(notes);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "out for delivery":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateTotal = () => {
    const itemsTotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return (itemsTotal + deliveryService.cost).toFixed(2);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as OrderDetailsProps["orderStatus"]);
    // In a real app, this would trigger an API call to update the order status
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomerNotes(e.target.value);
    // In a real app, this would be saved to the database
  };

  const handleContactCustomer = () => {
    // In a real app, this would open an email client or messaging interface
    window.open(`mailto:${customerEmail}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              Order Details
            </DialogTitle>
            <Badge
              className={`${getStatusColor(status)} px-3 py-1 text-xs uppercase`}
            >
              {status}
            </Badge>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Order #{orderId} • {orderDate}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Customer Information */}
          <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-3">
              Customer Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customerName}`}
                    alt="Customer Avatar"
                    className="w-10 h-10 rounded-full bg-gray-200"
                  />
                </div>
                <div className="ml-3">
                  <p className="font-medium">{customerName}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Mail className="w-4 h-4 mr-1" />
                    <span>{customerEmail}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Phone className="w-4 h-4 mr-1" />
                    <span>{customerPhone}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-gray-500 mt-1 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Delivery Address</p>
                    <p className="text-sm text-gray-600">{deliveryAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-3">Order Items</h3>
            <div className="space-y-3">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-2 bg-white rounded-md shadow-sm"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={
                        item.image ||
                        `https://api.dicebear.com/7.x/icons/svg?seed=${item.name}`
                      }
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between items-center p-2">
                <div className="flex items-center">
                  <Truck className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm">{deliveryService.name}</span>
                </div>
                <span className="font-medium">
                  ${deliveryService.cost.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center p-2 font-bold">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery and Payment Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-3">
              Delivery Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Truck className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm font-medium">
                  {deliveryService.name}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm">
                  Estimated Time: {deliveryService.estimatedTime}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm">Order Date: {orderDate}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-3">
              Payment Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm">Payment Method: {paymentMethod}</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm">Payment Status: </span>
                </div>
                <Badge
                  variant={
                    paymentStatus === "paid"
                      ? "default"
                      : paymentStatus === "pending"
                        ? "secondary"
                        : "destructive"
                  }
                  className="ml-2"
                >
                  {paymentStatus}
                </Badge>
              </div>
              <div className="flex items-center">
                <Package className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm">
                  Total Items:{" "}
                  {orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Status and Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-3">
              Update Order Status
            </h3>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="out for delivery">
                  Out for Delivery
                </SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-3">Admin Notes</h3>
            <Textarea
              placeholder="Add notes about this order..."
              value={customerNotes}
              onChange={handleNotesChange}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter className="mt-6 space-x-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="outline" onClick={handleContactCustomer}>
            Contact Customer
          </Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
