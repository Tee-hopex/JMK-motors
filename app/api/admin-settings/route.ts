import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest, unauthorizedResponse } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return unauthorizedResponse();

  try {
    const adminUser = await prisma.adminUser.findUnique({
      where: { username: admin.username },
      select: { username: true },
    });
    return NextResponse.json({ username: adminUser?.username || "" });
  } catch (error) {
    console.error("[GET /api/admin-settings]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return unauthorizedResponse();

  try {
    const body: { username?: string; password?: string } = await req.json();

    let updates: any = {};

    // Update username if provided
    if (body.username && body.username !== admin.username) {
      // Check if new username already exists
      const exists = await prisma.adminUser.findUnique({
        where: { username: body.username },
      });
      if (exists) {
        return NextResponse.json({ error: "Username already in use" }, { status: 400 });
      }
      updates.username = body.username;
    }

    // Update password if provided
    if (body.password) {
      if (body.password.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
      }
      updates.passwordHash = await bcrypt.hash(body.password, 10);
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No updates provided" }, { status: 400 });
    }

    const updated = await prisma.adminUser.update({
      where: { username: admin.username },
      data: updates,
      select: { username: true },
    });

    return NextResponse.json({ success: true, username: updated.username });
  } catch (error) {
    console.error("[POST /api/admin-settings]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
