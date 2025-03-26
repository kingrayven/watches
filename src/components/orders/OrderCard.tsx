import React from "react";
import { Clock, Package, User, MapPin, Phone, DollarSign } from "lucide-react";

interface OrderCardProps {
  id?: string;
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  orderDate?: string;
  status?: "pending" | "preparing" | "out-for-delivery" | "delivered";
  totalAmount?: number;
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  onViewDetails?: (id: string) => void;
  onUpdateStatus?: (id: string, status: string) => void;
}

const OrderCard = ({
  id = "ORD-1234",
  customerName = "John Doe",
  customerPhone = "+1 (555) 123-4567",
  deliveryAddress = "123 Main St, Anytown, USA",
  orderDate = "2023-06-15 14:30",
  status = "pending",
  totalAmount = 89.99,
  items = [
    { name: "Luxury Chronograph Watch", quantity: 1, price: 299.99 },
    { name: "Sports Digital Watch", quantity: 1, price: 149.5 },
    { name: "Classic Leather Watch", quantity: 1, price: 199.99 },
    { name: "Watch Strap - Premium Leather", quantity: 2, price: 45.99 },
  ],
  onViewDetails = () => {},
  onUpdateStatus = () => {},
}: OrderCardProps) => {
  const getStatusClass = () => {
    switch (status) {
      case "pending":
        return "badge badge-yellow";
      case "preparing":
        return "badge badge-blue";
      case "out-for-delivery":
        return "badge badge-purple";
      case "delivered":
        return "badge badge-green";
      default:
        return "badge";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="card" style={{ maxWidth: "350px" }}>
      <div className="card-header">
        <div className="flex justify-between items-start">
          <h3>{id}</h3>
          <span className={getStatusClass()}>{formatStatus(status)}</span>
        </div>
        <div
          className="flex items-center gap-1 mt-1"
          style={{ color: "#666", fontSize: "14px" }}
        >
          <Clock size={14} />
          <span>{orderDate}</span>
        </div>
      </div>

      <div className="card-content">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div className="flex items-start gap-2">
            <User size={16} style={{ color: "#666", marginTop: "2px" }} />
            <div>
              <p style={{ fontWeight: "500" }}>{customerName}</p>
              <div
                className="flex items-center gap-1"
                style={{ color: "#666", fontSize: "14px" }}
              >
                <Phone size={14} />
                <span>{customerPhone}</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin size={16} style={{ color: "#666", marginTop: "2px" }} />
            <p style={{ fontSize: "14px", color: "#666" }}>{deliveryAddress}</p>
          </div>

          <div>
            <div className="flex items-center gap-1 mb-1">
              <Package size={16} style={{ color: "#666" }} />
              <p style={{ fontWeight: "500" }}>Order Items ({items.length})</p>
            </div>
            <div
              style={{
                marginLeft: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                maxHeight: "96px",
                overflowY: "auto",
              }}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between"
                  style={{ fontSize: "14px" }}
                >
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span style={{ color: "#666" }}>
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="flex justify-between items-center mt-3"
              style={{ fontWeight: "500" }}
            >
              <div className="flex items-center gap-1">
                <DollarSign size={16} style={{ color: "#666" }} />
                <span>Total</span>
              </div>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="flex justify-between">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => onViewDetails(id)}
          >
            View Details
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              // Determine next status based on current status
              let nextStatus = "pending";
              switch (status) {
                case "pending":
                  nextStatus = "preparing";
                  break;
                case "preparing":
                  nextStatus = "out-for-delivery";
                  break;
                case "out-for-delivery":
                  nextStatus = "delivered";
                  break;
              }
              onUpdateStatus(id, nextStatus);
            }}
            disabled={status === "delivered"}
            style={
              status === "delivered"
                ? { opacity: 0.5, cursor: "not-allowed" }
                : {}
            }
          >
            {status === "delivered" ? "Completed" : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
