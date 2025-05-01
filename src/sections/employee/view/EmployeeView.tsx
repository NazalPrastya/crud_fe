"use client";

import { Users, ChartNoAxesCombined } from "lucide-react";
import CardTotal from "@/components/custom/stats/card-total";
import EmployeeTable from "../employee-table";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function fetchPositions() {
  const res = await axiosInstance.get(`/v1/employee`);
  return res.data;
}

export default function EmployeeView() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["employee"],
    queryFn: fetchPositions,
    refetchOnWindowFocus: true,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3">Employees</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CardTotal
          title="Total Employee"
          amount={data?.data?.meta?.total ?? 0}
          icon={Users}
        />
        <CardTotal
          title="Overall Score"
          amount={data?.data?.meta?.total ?? 0}
          icon={ChartNoAxesCombined}
        />
      </div>

      <div className="mt-6">
        <div className="flex justify-end mb-4">
          <Button asChild>
            <Link href="/dashboard/employee/create">Add Employee</Link>
          </Button>
        </div>
        <EmployeeTable data={data.data.data} onSuccess={() => refetch()} />
      </div>
    </div>
  );
}
