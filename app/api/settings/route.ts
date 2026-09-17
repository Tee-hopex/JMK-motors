import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
    return NextResponse.json(map);
  } catch (error) {
    console.error("[GET /api/settings]", error);
    return NextResponse.json({});
  }
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return unauthorizedResponse();

  try {
    const body: Record<string, string> = await req.json();
    const updates = await Promise.all(
      Object.entries(body).map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    );
    return NextResponse.json(updates);
  } catch (error) {
    console.error("[POST /api/settings]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
