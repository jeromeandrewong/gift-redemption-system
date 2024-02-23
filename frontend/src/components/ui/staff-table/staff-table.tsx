"use client";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Redeemed, Staff } from "./data/schema";
import { useState, useEffect } from "react";

const Staff = () => {
  const [data, setData] = useState<Staff[] | null>([]);
  const {
    data: staffData,
    isLoading: staffLoading,
    error: staffError,
  } = useQuery({
    queryKey: ["staff"],
    queryFn: getStaff,
  });

  const {
    data: redeemedData,
    isLoading: redeemedLoading,
    error: redeemedError,
  } = useQuery({
    queryKey: ["redeemed"],
    queryFn: getRedeemed,
  });
  if (redeemedData) {
    console.log(redeemedData);
  }
  useEffect(() => {
    const getStaffDatawithRedeemed = (staffData: Staff[]) => {
      return staffData.map((staff: Staff) => {
        const redeemed = redeemedData.find(
          (redeemed: Redeemed) => redeemed.team_name === staff.team_name,
        );

        return {
          ...staff,
          redeemed: Boolean(redeemed),
        };
      });
    };
    if (!staffData || !redeemedData) return;
    const staffDataWithRedeemed = getStaffDatawithRedeemed(staffData);
    setData(staffDataWithRedeemed);
  }, [staffData, redeemedData]);

  useEffect(() => {}, [data]);
  if (staffLoading || redeemedLoading) {
    return <div>Loading...</div>;
  }

  if (staffError || redeemedError) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">Staff</h1>
      <DataTable columns={columns} data={data as Staff[]} />
    </div>
  );
};

const getStaff = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/staff`);
  const staff = await res.json();
  return staff;
};

const getRedeemed = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/redeem`);
  const redeemed = await res.json();
  return redeemed;
};

const queryClient = new QueryClient();

const StaffTable = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Staff />
    </QueryClientProvider>
  );
};

export default StaffTable;
