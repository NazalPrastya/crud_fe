"use client";

import { useQuery } from "@tanstack/react-query";
import PositionTable from "../position-table";
import PositionFormCreate from "../position-form-create";
import { axiosInstance } from "@/lib/axios";

async function fetchPositions() {
  const res = await axiosInstance.get(`/v1/position`);
  return res.data;
}

export default function PositionView() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["positions"],
    queryFn: fetchPositions,
    refetchOnWindowFocus: true,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3">Position</h1>
      <div className="mt-6">
        <div className="flex items-center justify-end gap-x-3 mb-4">
          <PositionFormCreate onSuccess={() => refetch()} />
        </div>

        <PositionTable data={data.data} onSuccess={() => refetch()} />
      </div>
    </div>
  );
}
