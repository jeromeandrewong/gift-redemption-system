import { columns } from "@/components/ui/staff-table/columns";
import { DataTable } from "@/components/ui/staff-table/data-table";
import Image from "next/image";

export default async function Home() {
  const allStaff = await getStaff();
  console.log(allStaff);
  return (
    <main className="max-w-screen-xl mx-auto p-24">
      <DataTable data={allStaff} columns={columns} />
    </main>
  );
}

const getStaff = async () => {
  try {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/staff`);
    const staff = await res.json();
    return staff;
  } catch (e) {
    console.error(e);
  }
};
