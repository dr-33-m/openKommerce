import prismadb from "@/lib/prismadb";
import { OrderForm } from "./components/order-form";

const ColorPage = async ({ params }: { params: { orderId: string } }) => {
  const orders = await prismadb.order.findUnique({
    where: {
      id: params.orderId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderForm initialData={orders} />
      </div>
    </div>
  );
};

export default ColorPage;
