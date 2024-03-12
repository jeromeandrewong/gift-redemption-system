"use client";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useQueries,
} from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Redeemed, Staff } from "./data/schema";
import { useState, useEffect } from "react";
import { ShadowIcon } from "@radix-ui/react-icons";

const queryClient = new QueryClient();

const StaffTable = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Staff />
    </QueryClientProvider>
  );
};

export default StaffTable;

const Staff = () => {
  const [data, setData] = useState<Staff[] | null>([]);

  const results = useQueries({
    queries: [
      {
        queryKey: ["staff"],
        queryFn: getStaff,
      },
      {
        queryKey: ["redeemed"],
        queryFn: getRedeemed,
      },
    ],
  });
  const {
    data: staffData,
    isLoading: staffLoading,
    error: staffError,
  } = results[0];

  const {
    data: redeemedData,
    isLoading: redeemedLoading,
    error: redeemedError,
  } = results[1];

  useEffect(() => {
    const getStaffDatawithRedeemed = (staffData: Staff[]) => {
      return staffData.map((staff: Staff) => {
        const redeemed = redeemedData.find(
          (redeemed: Redeemed) => redeemed.team_name === staff.team_name,
        );

        return {
          ...staff,
          redeemed: String(Boolean(redeemed)),
        };
      });
    };

    if (!staffData || !redeemedData) return;

    const staffDataWithRedeemed = getStaffDatawithRedeemed(staffData);
    setData(staffDataWithRedeemed);
  }, [staffData, redeemedData]);

  if (staffLoading || redeemedLoading) {
    return (
      <div className="w-full flex justify-center">
        <ShadowIcon className="animate-spin w-10 h-10" />
      </div>
    );
  }

  if (staffError || redeemedError) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">Staff Redemption List</h1>
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/redemption`);
  const redeemed = await res.json();
  return redeemed;
};

// useEffect to fetch data example:
/*
const staff = ({role})=>{
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(()=>{
    fetch(`${endpoint}/${role}`)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => setError(err))
  }, [role])

  // JSX
}
*/
