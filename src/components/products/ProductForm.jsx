import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, X } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters" }),
  price: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Price must be a valid number",
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  isAvailable: z.boolean().default(true),
});

const ProductForm = ({
  product = {
    name: "",
    price: "",
    description: "",
    category: "",
    isAvailable: true,
  },
  onSubmit = () => {},
  isEditing = false,
}) => {
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: product,
  });

  const handleSubmit = (data) => {
    // Include images in the submission data
    const productData = {
      ...data,
      images: images,
    };
    onSubmit(productData);
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // In a real app, you would upload the file to a server
      // For this UI scaffolding, we'll just create a placeholder URL
      const newImages = [...images];
      for (let i = 0; i < e.target.files.length; i++) {
        newImages.push(URL.createObjectURL(e.target.files[i]));
      }
      setImages(newImages);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className="card">
      <h2 className="mb-4">{isEditing ? "Edit Watch" : "Add New Watch"}</h2>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="form-group">
          <label className="form-label">Watch Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter watch name"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="mt-1" style={{ color: "red" }}>
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-input"
            placeholder="0.00"
            {...form.register("price")}
          />
          <p className="mt-1" style={{ color: "#666", fontSize: "14px" }}>
            Enter the price in your local currency
          </p>
          {form.formState.errors.price && (
            <p className="mt-1" style={{ color: "red" }}>
              {form.formState.errors.price.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            placeholder="Enter watch description"
            {...form.register("description")}
          ></textarea>
          {form.formState.errors.description && (
            <p className="mt-1" style={{ color: "red" }}>
              {form.formState.errors.description.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select className="form-select" {...form.register("category")}>
            <option value="" disabled>
              Select a category
            </option>
            <option value="luxury">Luxury</option>
            <option value="sports">Sports</option>
            <option value="classic">Classic</option>
            <option value="smart">Smart</option>
            <option value="fashion">Fashion</option>
          </select>
          {form.formState.errors.category && (
            <p className="mt-1" style={{ color: "red" }}>
              {form.formState.errors.category.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <div className="card p-4">
            <div className="flex justify-between items-center">
              <div>
                <label className="form-label mb-1">Availability</label>
                <p style={{ color: "#666", fontSize: "14px" }}>
                  Set whether this watch is currently available for delivery
                </p>
              </div>
              <div>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={form.watch("isAvailable")}
                    {...form.register("isAvailable")}
                  />
                  <span>Available</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Watch Images</label>
          <div className="image-upload">
            {images.map((image, index) => (
              <div key={index} className="image-preview">
                <img src={image} alt={`Watch image ${index + 1}`} />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="image-remove-btn"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            {images.length < 5 && (
              <label className="image-upload-placeholder">
                <div className="flex flex-col items-center justify-center">
                  <Upload
                    size={24}
                    style={{ color: "#9ca3af", marginBottom: "8px" }}
                  />
                  <p style={{ fontSize: "12px", color: "#6b7280" }}>
                    Upload image
                  </p>
                </div>
                <input
                  type="file"
                  className="image-upload-input"
                  accept="image/*"
                  onChange={handleImageUpload}
                  multiple={images.length < 4}
                />
              </label>
            )}
          </div>
          {isUploading && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p
                style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}
              >
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}
          <p className="mt-1" style={{ color: "#666", fontSize: "14px" }}>
            Upload up to 5 watch images. Recommended size: 800x800px.
          </p>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" className="btn btn-outline">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update Watch" : "Add Watch"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
