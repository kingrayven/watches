import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DeliveryServiceList from "./DeliveryServiceList";
import ProductDeliveryBoard from "./ProductDeliveryBoard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, Truck, AlertCircle } from "lucide-react";

interface DeliveryService {
  id: string;
  name: string;
  price: number;
  estimatedTime: string;
  rating: number;
  available: boolean;
  image?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  assignedDelivery?: DeliveryService;
}

interface DeliveryAssignmentProps {
  products?: Product[];
  deliveryServices?: DeliveryService[];
}

const DeliveryAssignment = ({
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
        rating: 4.8,
        available: true,
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
  deliveryServices = [
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
}: DeliveryAssignmentProps) => {
  const [productsList, setProductsList] = useState<Product[]>(products);
  const [servicesList, setServicesList] =
    useState<DeliveryService[]>(deliveryServices);
  const [selectedService, setSelectedService] =
    useState<DeliveryService | null>(null);
  const [draggedService, setDraggedService] = useState<DeliveryService | null>(
    null,
  );
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleDragStart = (
    service: DeliveryService,
    event: React.DragEvent,
  ) => {
    setDraggedService(service);
    // Set data for drag operation
    event.dataTransfer.setData("application/json", JSON.stringify(service));
  };

  const handleServiceSelect = (service: DeliveryService) => {
    setSelectedService(service);
  };

  const handleAssignDelivery = (
    productId: string,
    deliveryService: DeliveryService,
  ) => {
    setProductsList((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, assignedDelivery: deliveryService }
          : product,
      ),
    );

    setAlertMessage(
      `${deliveryService.name} has been assigned to product successfully!`,
    );
    setShowAlert(true);

    // Hide alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleRemoveDelivery = (productId: string) => {
    setProductsList((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, assignedDelivery: undefined }
          : product,
      ),
    );

    setAlertMessage("Delivery service has been removed from product.");
    setShowAlert(true);

    // Hide alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleDragEnd = (result: DropResult) => {
    setDraggedService(null);
    // Handle drop logic here if implementing full drag and drop
  };

  const getAssignmentStats = () => {
    const totalProducts = productsList.length;
    const assignedProducts = productsList.filter(
      (p) => p.assignedDelivery,
    ).length;
    const unassignedProducts = totalProducts - assignedProducts;

    return { totalProducts, assignedProducts, unassignedProducts };
  };

  const stats = getAssignmentStats();

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {showAlert && (
        <Alert className="mb-6 border-green-500 bg-green-50">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Delivery Service Assignment</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Help
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalProducts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Assigned Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-green-600">
                  {stats.assignedProducts}
                </div>
                <Badge className="ml-2 bg-green-100 text-green-800">
                  {Math.round(
                    (stats.assignedProducts / stats.totalProducts) * 100,
                  )}
                  %
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Unassigned Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-amber-600">
                  {stats.unassignedProducts}
                </div>
                <Badge className="ml-2 bg-amber-100 text-amber-800">
                  {Math.round(
                    (stats.unassignedProducts / stats.totalProducts) * 100,
                  )}
                  %
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="board" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="board" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Assignment Board
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Delivery Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="board" className="space-y-4">
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <DeliveryServiceList
                    services={servicesList}
                    onDragStart={handleDragStart}
                    onServiceSelect={handleServiceSelect}
                  />
                </div>
                <div className="lg:col-span-3">
                  <ProductDeliveryBoard
                    products={productsList}
                    onAssignDelivery={handleAssignDelivery}
                    onRemoveDelivery={handleRemoveDelivery}
                  />
                </div>
              </div>
            </DragDropContext>
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>Available Delivery Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {servicesList.map((service) => (
                    <Card
                      key={service.id}
                      className={`${!service.available ? "opacity-60" : ""}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              service.image ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${service.id}`
                            }
                            alt={service.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <CardTitle className="text-base">
                            {service.name}
                          </CardTitle>
                        </div>
                        {!service.available && (
                          <Badge variant="secondary">Unavailable</Badge>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Price:
                            </span>
                            <span className="font-medium">
                              ${service.price.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Time:</span>
                            <span>{service.estimatedTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Rating:
                            </span>
                            <span className="flex items-center">
                              {service.rating}
                              <svg
                                className="w-4 h-4 text-yellow-500 ml-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DeliveryAssignment;
