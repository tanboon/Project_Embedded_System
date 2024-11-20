import React from "react";
import { Card } from "./UI/card";

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
}

export const StatusCard = ({
  title,
  value,
  icon,
  className,
}: StatusCardProps) => {
  return (
    <Card className={`glass-card p-6 animate-fade-in ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-row text-left justify-between space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="text-primary">{icon}</div>
      </div>
    </Card>
  );
};
