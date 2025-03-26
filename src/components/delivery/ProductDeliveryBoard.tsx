import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Clock, DollarSign, Truck, Package } from "lucide-react";

interface DeliveryService {
  id: string;
  name: string;
  price: number;
  estimatedTime: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  assignedDelivery?: DeliveryService;
}

interface ProductDeliveryBoardProps {
  products?: Product[];
  onAssignDelivery?: (
    productId: string,
    deliveryService: DeliveryService,
  ) => void;
  onRemoveDelivery?: (productId: string) => void;
}

const ProductDeliveryBoard = ({
  products = [
    {
      id: "1",
      name: "Organic Vegetables Bundle",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&q=80",
    },
    {
      id: "2",
      name: "Fresh Bakery Selection",
      price: 18.5,
      image:
        "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400&q=80",
      assignedDelivery: {
        id: "ds2",
        name: "Express Delivery",
        price: 8.99,
        estimatedTime: "1-2 hours",
      },
    },
    {
      id: "3",
      name: "Gourmet Cheese Platter",
      price: 32.99,
      image:
        "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&q=80",
    },
    {
      id: "4",
      name: "Premium Coffee Beans",
      price: 15.99,
      image:
        "https://images.unsplash.com/photo-1559525839-8f275eef9d67?w=400&q=80",
    },
  ],
  onAssignDelivery = () => {},
  onRemoveDelivery = () => {},
}: ProductDeliveryBoardProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deliveryPrice, setDeliveryPrice] = useState<string>("");
  const [estimatedTime, setEstimatedTime] = useState<string>("");
  const [selectedDeliveryService, setSelectedDeliveryService] =
    useState<string>("");

  const availableDeliveryServices = [
    { id: "ds1", name: "Standard Delivery" },
    { id: "ds2", name: "Express Delivery" },
    { id: "ds3", name: "Same Day Delivery" },
    { id: "ds4", name: "Next Day Delivery" },
  ];

  const handleAssignDelivery = () => {
    if (!selectedProduct || !selectedDeliveryService || !deliveryPrice) return;

    const service = availableDeliveryServices.find(
      (s) => s.id === selectedDeliveryService,
    );
    if (!service) return;

    const deliveryService: DeliveryService = {
      id: service.id,
      name: service.name,
      price: parseFloat(deliveryPrice),
      estimatedTime: estimatedTime || "Not specified",
    };

    onAssignDelivery(selectedProduct.id, deliveryService);
    resetForm();
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setSelectedDeliveryService("");
    setDeliveryPrice("");
    setEstimatedTime("");
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    if (product.assignedDelivery) {
      setSelectedDeliveryService(product.assignedDelivery.id);
      setDeliveryPrice(product.assignedDelivery.price.toString());
      setEstimatedTime(product.assignedDelivery.estimatedTime);
    } else {
      setSelectedDeliveryService("");
      setDeliveryPrice("");
      setEstimatedTime("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold mb-6">Product Delivery Assignment</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className={`cursor-pointer transition-all ${selectedProduct?.id === product.id ? "ring-2 ring-primary" : ""}`}
            onClick={() => handleProductSelect(product)}
          >
            <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.assignedDelivery && (
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
                  <Truck className="w-3 h-3 mr-1" />
                  <span>Delivery Assigned</span>
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-gray-700 mb-2">
                <Package className="w-4 h-4 mr-2" />
                <span>${product.price.toFixed(2)}</span>
              </div>
              {product.assignedDelivery && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="w-4 h-4 mr-2" />
                    <span>{product.assignedDelivery.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>${product.assignedDelivery.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{product.assignedDelivery.estimatedTime}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedProduct && (
        <div className="mt-8 p-6 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            {selectedProduct.assignedDelivery
              ? `Edit Delivery for ${selectedProduct.name}`
              : `Assign Delivery for ${selectedProduct.name}`}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="delivery-service">Delivery Service</Label>
              <Select
                value={selectedDeliveryService}
                onValueChange={setSelectedDeliveryService}
              >
                <SelectTrigger id="delivery-service" className="w-full mt-1">
                  <SelectValue placeholder="Select a delivery service" />
                </SelectTrigger>
                <SelectContent>
                  {availableDeliveryServices.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="delivery-price">Delivery Price ($)</Label>
              <Input
                id="delivery-price"
                type="number"
                placeholder="0.00"
                value={deliveryPrice}
                onChange={(e) => setDeliveryPrice(e.target.value)}
                className="mt-1"
                min="0"
                step="0.01"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="estimated-time">Estimated Delivery Time</Label>
              <Input
                id="estimated-time"
                placeholder="e.g. 1-2 hours, Same day, etc."
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="mt-6 flex space-x-3">
            {selectedProduct.assignedDelivery && (
              <Button
                variant="destructive"
                onClick={() => {
                  onRemoveDelivery(selectedProduct.id);
                  resetForm();
                }}
              >
                Remove Delivery
              </Button>
            )}
            <Button onClick={handleAssignDelivery}>
              {selectedProduct.assignedDelivery
                ? "Update Delivery"
                : "Assign Delivery"}
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDeliveryBoard;
