"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import axios from "axios";
import { Button } from "../button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  staffPassId: string;
  teamName: string;
}

export function DataTableRowActions<TData>({
  teamName,
  staffPassId,
  row,
}: DataTableRowActionsProps<TData>) {
  const queryClient = useQueryClient();
  const redeemGift = async (data: {
    teamName: string;
    staffPassId: string;
  }) => {
    console.log(teamName, staffPassId);
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/redeem`, {
      team_name: data.teamName,
      staff_pass_id: data.staffPassId,
    });
    return res.data;
  };

  const { mutate } = useMutation({
    mutationFn: redeemGift,
    onSuccess() {
      toast("Gift redeemed successfully!");
      queryClient.invalidateQueries({ queryKey: ["redeemed"] });
    },
  });

  const handleRedeemGift = () => {
    mutate({ teamName, staffPassId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[140px]">
        <DropdownMenuItem onClick={handleRedeemGift}>
          Redeem Gift
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
