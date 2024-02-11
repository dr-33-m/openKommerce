import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { LookClient } from "./components/client";
import { LookColumn } from "./components/columns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const looks = await prismadb.look.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedLooks: LookColumn[] = looks.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <LookClient data={formattedLooks} />
      </div>
    </div>
  );
};

export default ColorsPage;
