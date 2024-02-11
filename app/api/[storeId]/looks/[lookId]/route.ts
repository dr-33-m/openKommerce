import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { lookId: string } }
) {
  try {
    if (!params.lookId) {
      return new NextResponse("Look id is  required", { status: 400 });
    }

    const look = await prismadb.look.findUnique({
      where: {
        id: params.lookId,
      },
    });

    return NextResponse.json(look);
  } catch (error) {
    console.log("[LOOK_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; lookId: string } }
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

    if (!params.lookId) {
      return new NextResponse("Look id is  required", { status: 400 });
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

    const look = await prismadb.look.updateMany({
      where: {
        id: params.lookId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(look);
  } catch (error) {
    console.log("[LOOK_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { lookId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.lookId) {
      return new NextResponse("Look id is  required", { status: 400 });
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

    const look = await prismadb.look.deleteMany({
      where: {
        id: params.lookId,
      },
    });

    return NextResponse.json(look);
  } catch (error) {
    console.log("[LOOK_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
