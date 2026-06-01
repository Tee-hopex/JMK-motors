import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest, unauthorizedResponse } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { carId, name, email, phone, message } = await req.json();

    if (!carId || !name || !email || !phone) {
      return NextResponse.json({ error: "carId, name, email and phone are required" }, { status: 400 });
    }

    const car = await prisma.car.findUnique({ where: { id: carId } });
    if (!car) return NextResponse.json({ error: "Car not found" }, { status: 404 });

    const reservation = await prisma.reservation.create({
      data: { carId, name, email, phone, message },
      include: { car: { select: { make: true, model: true, year: true } } },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("[POST /api/reservations]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return unauthorizedResponse();

  try {
    const reservations = await prisma.reservation.findMany({
      include: { car: { select: { make: true, model: true, year: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reservations);
  } catch (error) {
    console.error("[GET /api/reservations]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
