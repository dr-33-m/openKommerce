import prismadb from "@/lib/prismadb";
import { CollectionForm } from "./components/collection-form";

const CollectionPage = async ({
  params,
}: {
  params: { collectionId: string; storeId: string };
}) => {
  const collection = await prismadb.collection.findUnique({
    where: {
      id: params.collectionId,
    },
  });

  const billboards = await prismadb.billboards.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CollectionForm billboards={billboards} initialData={collection} />
      </div>
    </div>
  );
};

export default CollectionPage;
