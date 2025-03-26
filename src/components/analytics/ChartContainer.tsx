import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DownloadIcon, PrinterIcon, FilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
  filterOptions?: {
    label: string;
    value: string;
  }[];
  onFilterChange?: (value: string) => void;
  onExport?: (type: "csv" | "pdf" | "print") => void;
}

const ChartContainer = ({
  title = "Chart Title",
  children = (
    <div className="flex items-center justify-center h-64 bg-muted/20 rounded-md">
      Chart content will appear here
    </div>
  ),
  className,
  filterOptions = [
    { label: "Last 7 days", value: "7days" },
    { label: "Last 30 days", value: "30days" },
    { label: "Last 90 days", value: "90days" },
  ],
  onFilterChange = () => {},
  onExport = () => {},
}: ChartContainerProps) => {
  return (
    <Card className={cn("w-full h-full bg-white shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Select
            defaultValue={filterOptions[0]?.value}
            onValueChange={onFilterChange}
          >
            <SelectTrigger className="w-[180px] h-8">
              <FilterIcon className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2"
              onClick={() => onExport("csv")}
              title="Download as CSV"
            >
              <DownloadIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2"
              onClick={() => onExport("pdf")}
              title="Download as PDF"
            >
              <DownloadIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2"
              onClick={() => onExport("print")}
              title="Print Report"
            >
              <PrinterIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">{children}</CardContent>
    </Card>
  );
};

export default ChartContainer;
