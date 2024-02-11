import prismadb from "@/lib/prismadb";
import { LookForm } from "./components/look-form";

const ColorPage = async ({ params }: { params: { lookId: string } }) => {
  const looks = await prismadb.look.findUnique({
    where: {
      id: params.lookId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <LookForm initialData={looks} />
      </div>
    </div>
  );
};

export default ColorPage;
