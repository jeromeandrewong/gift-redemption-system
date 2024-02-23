"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "../badge";

import { Staff } from "./data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: "staff_pass_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Staff Pass ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[200px]">{row.getValue("staff_pass_id")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "team_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Team Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("team_name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const timestamp = formatDate(date);
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {timestamp}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "redeemed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Redeemed" />
    ),
    cell: ({ row }) => {
      if (row.getValue("redeemed") === "true") {
        return (
          <Badge variant="secondary" className="hover:font-normal">
            Redeemed
          </Badge>
        );
      }

      return (
        <Badge variant="default" className="font-normal">
          Not Redeemed
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const redeemed = row.getValue("redeemed");

      if (redeemed === "true") {
        return null;
      }
      return (
        <DataTableRowActions
          teamName={row.getValue("team_name")}
          staffPassId={row.getValue("staff_pass_id")}
          row={row}
        />
      );
    },
  },
];
