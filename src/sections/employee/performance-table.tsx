import { DataTable } from "@/components/custom/data-table/data-table";
import { DataTableRowActions } from "@/components/custom/data-table/data-table-row-actions";
import { DataTableColumnHeader } from "@/components/custom/data-table/data-table-column-header";
import { useState } from "react";
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";
import { axiosInstance } from "@/lib/axios";
import PerformanceFormEdit from "./performance-form-edit";

type PerformanceProps = {
  id: string;
  employeeId: string;
  notes: string;
  score: string;
  reviewer: string;
};
export default function PerformanceTable({
  performanceData,
  onSuccess,
}: {
  performanceData: PerformanceProps[];
  onSuccess: () => void;
}) {
  const [selectedPerformance, setSelectedPerformance] =
    useState<PerformanceProps | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      const { data } = await axiosInstance.delete(`/v1/performance/${id}`);
      if (data.status === "OK") {
        toast.success(data.message);
        onSuccess?.();
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong while deleting.");
    }
  };

  const handleEdit = (performance: PerformanceProps) => {
    setSelectedPerformance(performance);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setSelectedPerformance(null);
    onSuccess?.();
  };
  const columns: ColumnDef<PerformanceProps>[] = [
    {
      id: "no",
      header: "No",
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        const rowIndex = row.index;

        return (pageIndex * pageSize + rowIndex + 1).toString();
      },
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "notes",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Notes" />
      ),
      cell: ({ row }) => <div>{row.getValue("notes")}</div>,
    },
    {
      accessorKey: "score",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Score" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">{row.getValue("score")}</div>
      ),
    },
    {
      accessorKey: "reviewer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Reviewer" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">{row.getValue("reviewer")}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          onEdit={(performance) => handleEdit(performance)}
          onDelete={(performance) => handleDelete(performance.id)}
        />
      ),
    },
  ];
  return (
    <>
      <DataTable
        columns={columns}
        data={performanceData}
        filterColumn="reviewer"
        searchPlaceholder="Filter name..."
      />

      {selectedPerformance && (
        <PerformanceFormEdit
          initialValues={selectedPerformance}
          onSuccess={handleEditSuccess}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      )}
    </>
  );
}
