"use client";

import type { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleEllipsis, Edit, Trash } from "lucide-react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
}

export function DataTableRowActions<TData>({
  row,
  onEdit,
  onDelete,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-10 w-10 p-0 data-[state=open]:bg-muted"
        >
          <CircleEllipsis size={40} />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            <Edit className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Edit
          </DropdownMenuItem>
        )}
        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(row.original)}>
              <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
