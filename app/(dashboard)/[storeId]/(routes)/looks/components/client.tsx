"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { LookColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface LooksClientProps {
  data: LookColumn[];
}

export const LookClient: React.FC<LooksClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Looks (${data.length})`}
          description="Manage looks for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/looks/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API calls for Looks" />
      <Separator />
      <ApiList entityName="looks" entityIdName="lookId" />
    </>
  );
};
