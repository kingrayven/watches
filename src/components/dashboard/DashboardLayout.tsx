import React, { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

// Let's read the Sidebar file to see how it's exported
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="bg-white dark:bg-gray-800"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          fixed md:static md:translate-x-0 z-40 transition-transform duration-300 ease-in-out h-full`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
        <div className="container mx-auto">
          {children || (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Welcome to the Delivery Management Dashboard
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Select a section from the sidebar to manage your products,
                  delivery services, orders, or view analytics.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default DashboardLayout;
