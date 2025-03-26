import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "../../lib/utils";
import { ArrowDownIcon, ArrowUpIcon, TrendingUpIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const SummaryCard = ({
  title = "Summary",
  value = "0",
  icon = <TrendingUpIcon className="h-6 w-6" />,
  trend,
  className,
}: SummaryCardProps) => {
  return (
    <Card className={cn("overflow-hidden bg-white", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="rounded-full bg-primary/10 p-2">{icon}</div>
          {trend && (
            <div
              className={cn(
                "flex items-center text-sm font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600",
              )}
            >
              {trend.isPositive ? (
                <ArrowUpIcon className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDownIcon className="mr-1 h-4 w-4" />
              )}
              {trend.value}%
            </div>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
