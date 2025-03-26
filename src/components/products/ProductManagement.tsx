import React, { useState } from "react";
import { AlertCircle, BarChart2, Package } from "lucide-react";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  createdAt: string;
}

interface ProductManagementProps {
  products?: Product[];
}

const ProductManagement = ({ products }: ProductManagementProps = {}) => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for product statistics
  const productStats = {
    total: 125,
    inStock: 98,
    lowStock: 15,
    outOfStock: 12,
  };

  const handleAddProduct = (data: any) => {
    // In a real app, this would add the product to the database
    console.log("Adding product:", data);
    setIsAddProductOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditProductOpen(true);
  };

  const handleUpdateProduct = (data: any) => {
    // In a real app, this would update the product in the database
    console.log("Updating product:", data);
    setIsEditProductOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    // In a real app, this would delete the product from the database
    console.log("Deleting product with ID:", productId);
  };

  return (
    <div className="container">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1>Watch Management</h1>
            <p style={{ color: "#666", marginTop: "4px" }}>
              Add, edit, and manage your watch inventory
            </p>
          </div>
          <button
            className="btn btn-primary flex items-center gap-1"
            onClick={() => setIsAddProductOpen(true)}
          >
            <Package size={16} />
            Add New Watch
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="card">
            <div className="card-header">
              <h3 style={{ color: "#666", fontSize: "14px" }}>Total Watches</h3>
            </div>
            <div className="card-content">
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                {productStats.total}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3 style={{ color: "#666", fontSize: "14px" }}>In Stock</h3>
            </div>
            <div className="card-content">
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#16a34a",
                }}
              >
                {productStats.inStock}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3 style={{ color: "#666", fontSize: "14px" }}>Low Stock</h3>
            </div>
            <div className="card-content">
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#ca8a04",
                }}
              >
                {productStats.lowStock}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3 style={{ color: "#666", fontSize: "14px" }}>Out of Stock</h3>
            </div>
            <div className="card-content">
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#dc2626",
                }}
              >
                {productStats.outOfStock}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <div className="tabs">
              <div
                className={`tab ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All Watches
              </div>
              <div
                className={`tab ${activeTab === "in-stock" ? "active" : ""}`}
                onClick={() => setActiveTab("in-stock")}
              >
                In Stock
              </div>
              <div
                className={`tab ${activeTab === "low-stock" ? "active" : ""}`}
                onClick={() => setActiveTab("low-stock")}
              >
                Low Stock
              </div>
              <div
                className={`tab ${activeTab === "out-of-stock" ? "active" : ""}`}
                onClick={() => setActiveTab("out-of-stock")}
              >
                Out of Stock
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-outline btn-sm flex items-center gap-1">
                <AlertCircle size={16} />
                Inventory Alerts
              </button>
              <button className="btn btn-outline btn-sm flex items-center gap-1">
                <BarChart2 size={16} />
                Watch Analytics
              </button>
            </div>
          </div>

          <div className={`tab-content ${activeTab === "all" ? "active" : ""}`}>
            <ProductTable
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onAdd={() => setIsAddProductOpen(true)}
            />
          </div>
          <div
            className={`tab-content ${activeTab === "in-stock" ? "active" : ""}`}
          >
            <ProductTable
              products={[
                {
                  id: "1",
                  name: "Luxury Chronograph Watch",
                  price: 299.99,
                  category: "Luxury",
                  status: "In Stock",
                  createdAt: "2023-05-15",
                },
                {
                  id: "3",
                  name: "Classic Leather Watch",
                  price: 199.99,
                  category: "Classic",
                  status: "In Stock",
                  createdAt: "2023-05-16",
                },
                {
                  id: "5",
                  name: "Minimalist Watch",
                  price: 129.99,
                  category: "Fashion",
                  status: "In Stock",
                  createdAt: "2023-05-17",
                },
              ]}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onAdd={() => setIsAddProductOpen(true)}
            />
          </div>
          <div
            className={`tab-content ${activeTab === "low-stock" ? "active" : ""}`}
          >
            <ProductTable
              products={[
                {
                  id: "2",
                  name: "Sports Digital Watch",
                  price: 149.5,
                  category: "Sports",
                  status: "Low Stock",
                  createdAt: "2023-05-14",
                },
              ]}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onAdd={() => setIsAddProductOpen(true)}
            />
          </div>
          <div
            className={`tab-content ${activeTab === "out-of-stock" ? "active" : ""}`}
          >
            <ProductTable
              products={[
                {
                  id: "4",
                  name: "Smart Watch Pro",
                  price: 349.99,
                  category: "Smart",
                  status: "Out of Stock",
                  createdAt: "2023-05-13",
                },
              ]}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onAdd={() => setIsAddProductOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Edit Product Dialog */}
      {isAddProductOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-header">
              <h2>Add New Watch</h2>
            </div>
            <div className="dialog-content">
              <ProductForm onSubmit={handleAddProduct} />
            </div>
            <div className="dialog-footer">
              <button
                className="btn btn-outline"
                onClick={() => setIsAddProductOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Dialog */}
      {isEditProductOpen && selectedProduct && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-header">
              <h2>Edit Watch</h2>
            </div>
            <div className="dialog-content">
              <ProductForm
                product={{
                  name: selectedProduct.name,
                  price: selectedProduct.price.toString(),
                  description: "High-quality watch with premium features.", // Placeholder
                  category: selectedProduct.category.toLowerCase(),
                  isAvailable: selectedProduct.status !== "Out of Stock",
                }}
                isEditing={true}
                onSubmit={handleUpdateProduct}
              />
            </div>
            <div className="dialog-footer">
              <button
                className="btn btn-outline"
                onClick={() => setIsEditProductOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
