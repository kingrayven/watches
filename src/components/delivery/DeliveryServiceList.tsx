import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Clock, Truck, Star } from "lucide-react";

interface DeliveryService {
  id: string;
  name: string;
  price: number;
  estimatedTime: string;
  rating: number;
  available: boolean;
  image?: string;
}

interface DeliveryServiceListProps {
  services?: DeliveryService[];
  onDragStart?: (service: DeliveryService, event: React.DragEvent) => void;
  onServiceSelect?: (service: DeliveryService) => void;
}

const DeliveryServiceList = ({
  services = [
    {
      id: "1",
      name: "Express Delivery",
      price: 15.99,
      estimatedTime: "30-45 min",
      rating: 4.8,
      available: true,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=express",
    },
    {
      id: "2",
      name: "Standard Delivery",
      price: 8.99,
      estimatedTime: "60-90 min",
      rating: 4.5,
      available: true,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=standard",
    },
    {
      id: "3",
      name: "Economy Delivery",
      price: 5.99,
      estimatedTime: "90-120 min",
      rating: 4.2,
      available: true,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=economy",
    },
    {
      id: "4",
      name: "Premium Delivery",
      price: 24.99,
      estimatedTime: "15-30 min",
      rating: 4.9,
      available: false,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=premium",
    },
  ],
  onDragStart = () => {},
  onServiceSelect = () => {},
}: DeliveryServiceListProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-full overflow-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Available Delivery Services</h2>
        <p className="text-sm text-gray-500">
          Drag a service to assign it to a product
        </p>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <Card
            key={service.id}
            className={`cursor-grab ${!service.available ? "opacity-60" : ""}`}
            draggable={service.available}
            onDragStart={(e) => onDragStart(service, e)}
            onClick={() => service.available && onServiceSelect(service)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={
                      service.image ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${service.id}`
                    }
                    alt={service.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <CardTitle className="text-base">{service.name}</CardTitle>
                </div>
                {!service.available && (
                  <Badge variant="secondary">Unavailable</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">
                    ${service.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{service.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Delivery</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{service.rating}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                disabled={!service.available}
              >
                Select Service
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DeliveryServiceList;
