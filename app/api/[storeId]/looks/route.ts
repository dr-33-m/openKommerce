// Global imports
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// local imports
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Look id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const look = await prismadb.look.create({
      data: {
        name,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(look);
  } catch (error) {
    console.log("[LOOK_POST]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const look = await prismadb.look.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(look);
  } catch (error) {
    console.log("[LOOKS_GET]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
