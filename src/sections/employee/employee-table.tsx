import { DataTable } from "@/components/custom/data-table/data-table";
import { DataTableColumnHeader } from "@/components/custom/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/custom/data-table/data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Employee } from "./employee-type";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

type LevelVariant = "green" | "yellow" | "default" | "destructive" | "outline";

interface Level {
  value: string;
  label: string;
  variant: LevelVariant;
}

const levels: Level[] = [
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

export default function EmployeeTable({
  data,
  onSuccess,
}: {
  data: Employee[];
  onSuccess: () => void;
}) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const { data } = await axiosInstance.delete(`/v1/employee/${id}`);
      if (data.status === "OK") {
        toast.success(data.message);
        onSuccess?.();
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong while deleting.");
    }
  };
  const columns: ColumnDef<Employee>[] = [
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
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[500px]">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "position",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Position" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[500px]">{row.getValue("position")}</div>
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
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "dateJoin",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date Join" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("dateJoin"));
        return <div>{format(date, "MMM dd, yyyy")}</div>;
      },
      sortingFn: "datetime",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          onEdit={(employee) =>
            router.push(`/dashboard/employee/${employee.id}`)
          }
          onDelete={(employee) => handleDelete(employee.id)}
        />
      ),
    },
  ];
  return (
    <DataTable
      columns={columns}
      data={data}
      filterColumn="name"
      searchPlaceholder="Filter tasks..."
    />
  );
}
