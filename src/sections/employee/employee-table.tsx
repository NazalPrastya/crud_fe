import { DataTable } from "@/components/custom/data-table/data-table";
import { DataTableColumnHeader } from "@/components/custom/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/custom/data-table/data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Employee } from "./employee-type";

const levels = [
  {
    value: "Junior",
    label: "Junior",
    variant: "green",
  },
  {
    value: "Mid",
    label: "Mid",
    variant: "yellow",
  },
  {
    value: "Senior",
    label: "Senior",
    variant: "default",
  },
];

export default function EmployeeTable({ data }: { data: Employee[] }) {
  // Define columns
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
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Task ID" />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
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
        return <div>{row.getValue<Date>("dateJoin").toLocaleDateString()}</div>;
      },
      sortingFn: "datetime",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          onEdit={(task) => console.log("Edit", task)}
          onDelete={(task) => console.log("Delete", task)}
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
