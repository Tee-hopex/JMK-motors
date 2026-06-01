import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest, unauthorizedResponse } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");
    const make = searchParams.get("make");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const fuelType = searchParams.get("fuelType");
    const transmission = searchParams.get("transmission");
    const bodyType = searchParams.get("bodyType");
    const condition = searchParams.get("condition");
    const minYear = searchParams.get("minYear");
    const maxYear = searchParams.get("maxYear");
    const maxMileage = searchParams.get("maxMileage");

    const where: Record<string, unknown> = { sold: false };

    if (featured === "true") where.featured = true;
    if (make) where.make = make;
    if (fuelType) where.fuelType = fuelType;
    if (transmission) where.transmission = transmission;
    if (bodyType) where.bodyType = bodyType;
    if (condition) where.condition = condition;
    if (minPrice || maxPrice) {
      where.price = {
        ...(minPrice ? { gte: parseFloat(minPrice) } : {}),
        ...(maxPrice ? { lte: parseFloat(maxPrice) } : {}),
      };
    }
    if (minYear || maxYear) {
      where.year = {
        ...(minYear ? { gte: parseInt(minYear) } : {}),
        ...(maxYear ? { lte: parseInt(maxYear) } : {}),
      };
    }
    if (maxMileage) where.mileage = { lte: parseInt(maxMileage) };

    const cars = await prisma.car.findMany({
      where,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(cars);
  } catch (error) {
    console.error("[GET /api/cars]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return unauthorizedResponse();

  try {
    const body = await req.json();
    const car = await prisma.car.create({ data: body });
    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error("[POST /api/cars]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
