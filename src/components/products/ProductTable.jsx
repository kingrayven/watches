import React, { useState } from "react";
import {
  Edit,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Filter,
  ArrowUpDown,
} from "lucide-react";

const ProductTable = ({
  products = [
    {
      id: "1",
      name: "Luxury Chronograph Watch",
      price: 299.99,
      category: "Luxury",
      status: "In Stock",
      createdAt: "2023-05-15",
    },
    {
      id: "2",
      name: "Sports Digital Watch",
      price: 149.5,
      category: "Sports",
      status: "Low Stock",
      createdAt: "2023-05-14",
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
      id: "4",
      name: "Smart Watch Pro",
      price: 349.99,
      category: "Smart",
      status: "Out of Stock",
      createdAt: "2023-05-13",
    },
    {
      id: "5",
      name: "Minimalist Watch",
      price: 129.99,
      category: "Fashion",
      status: "In Stock",
      createdAt: "2023-05-17",
    },
  ],
  onEdit = () => {},
  onDelete = () => {},
  onAdd = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProducts(products.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId, checked) => {
    if (checked) {
      setSelectedProducts((prev) => [...prev, productId]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "In Stock":
        return "badge badge-green";
      case "Low Stock":
        return "badge badge-yellow";
      case "Out of Stock":
        return "badge badge-red";
      default:
        return "badge";
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2>Watches</h2>
        <button
          className="btn btn-primary flex items-center gap-1"
          onClick={onAdd}
        >
          <Plus size={16} />
          Add Watch
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="search-container">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search watches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm flex items-center gap-1">
            <Filter size={16} />
            Filter
          </button>
          <button className="btn btn-outline btn-sm flex items-center gap-1">
            <ArrowUpDown size={16} />
            Sort
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={
                      selectedProducts.length === products.length &&
                      products.length > 0
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </div>
              </th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={(e) =>
                          handleSelectProduct(product.id, e.target.checked)
                        }
                      />
                    </div>
                  </td>
                  <td>
                    <strong>{product.name}</strong>
                  </td>
                  <td>{product.category}</td>
                  <td>₱{product.price.toFixed(2)}</td>
                  <td>
                    <span className={getStatusClass(product.status)}>
                      {product.status}
                    </span>
                  </td>
                  <td>{product.createdAt}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => onEdit(product)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(product.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  style={{ textAlign: "center", padding: "24px" }}
                >
                  No watches found. Try adjusting your search or add a new
                  watch.
                </td>
              </tr>
            )}
          </tbody>
          <caption>A list of your watches</caption>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          {selectedProducts.length > 0 ? (
            <span>
              {selectedProducts.length} watch
              {selectedProducts.length > 1 ? "es" : ""} selected
            </span>
          ) : (
            <span>
              Showing {filteredProducts.length} of {products.length} watches
            </span>
          )}
        </div>

        {selectedProducts.length > 0 && (
          <div className="flex gap-2">
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setSelectedProducts([])}
            >
              Deselect All
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                selectedProducts.forEach((id) => onDelete(id));
                setSelectedProducts([]);
              }}
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
