import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ElementType } from "react";

interface CardTotalProps {
  title: string;
  amount: string;
  period?: string;
  className?: string;
  icon?: ElementType;
}
export default function CardTotal({
  title,
  amount,
  className,
  icon: Icon,
}: CardTotalProps) {
  return (
    <Card className={cn("h-full w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <h3 className="text-sm font-medium">{title}</h3>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{amount}</div>
      </CardContent>
    </Card>
  );
}
