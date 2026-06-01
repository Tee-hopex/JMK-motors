import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest, unauthorizedResponse } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return unauthorizedResponse();

  try {
    const { status } = await req.json();
    const reservation = await prisma.reservation.update({
      where: { id: params.id },
      data: { status },
      include: { car: { select: { make: true, model: true, year: true } } },
    });
    return NextResponse.json(reservation);
  } catch (error) {
    console.error("[PUT /api/reservations/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return unauthorizedResponse();

  try {
    await prisma.reservation.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[DELETE /api/reservations/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
