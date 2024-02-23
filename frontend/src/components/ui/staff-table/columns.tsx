"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "../badge";

import { Staff } from "./data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: "staff_pass_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Staff Pass ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("staff_pass_id")}</div>
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
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("created_at")}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "is_deleted",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     if (row.getValue("is_deleted")) {
  //       return (
  //         <Badge variant="outline" className="hover: font-normal">
  //           Removed
  //         </Badge>
  //       );
  //     }

  //     return (
  //       <Badge variant="default" className="font-normal">
  //         Active
  //       </Badge>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
