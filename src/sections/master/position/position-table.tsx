import { DataTable } from "@/components/custom/data-table/data-table";
import { DataTableColumnHeader } from "@/components/custom/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/custom/data-table/data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import axios from "axios";

type PositionProps = {
  id: string;
  name: string;
  desc: string;
  level: "Junior" | "Senior" | "Mid";
};
type LevelProps = {
  value: string;
  label: string;
  variant: "green" | "yellow" | "default";
};

const levels: LevelProps[] = [
  {
    value: "junior",
    label: "Junior",
    variant: "green",
  },
  {
    value: "mid",
    label: "Mid",
    variant: "yellow",
  },
  {
    value: "senior",
    label: "Senior",
    variant: "default",
  },
];

export default function PositionTable({
  data,
  onSuccess,
}: {
  data: PositionProps[];
  onSuccess: () => void;
}) {
  const handleDelete = async (id: string) => {
    try {
      const { data } = await axios.delete(
        `${process.env.HOST_API_URL}/v1/position/${id}`
      );
      if (data.status === "OK") {
        toast.success(data.message);
        onSuccess?.();
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong while deleting.");
    }
  };

  const columns: ColumnDef<PositionProps>[] = [
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
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[500px]">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "desc",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[500px]">{row.getValue("desc")}</div>
      ),
    },
    {
      accessorKey: "level",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Level" />
      ),
      cell: ({ row }) => {
        const level = levels.find(
          (level) => level.value === row.getValue("level")
        );

        if (!level) {
          return null;
        }

        return (
          <div className="flex items-center">
            <Badge variant={level.variant || "default"}>{level.label}</Badge>
          </div>
        );
      },
      filterFn: (row, name, value) => {
        return value.includes(row.getValue(name));
      },
    },

    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          onEdit={(task) => console.log("Edit", task)}
          onDelete={(task) => handleDelete(task.id)}
        />
      ),
    },
  ];
  return (
    <DataTable
      columns={columns}
      data={data}
      filterColumn="name"
      searchPlaceholder="Filter name..."
    />
  );
}
