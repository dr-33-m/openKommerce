import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { CollectionClient } from "./components/client";
import { CollectionColumn } from "./components/columns";

const CollectionPage = async ({ params }: { params: { storeId: string } }) => {
  const collections = await prismadb.collection.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCollections: CollectionColumn[] = collections.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CollectionClient data={formattedCollections} />
      </div>
    </div>
  );
};

export default CollectionPage;
