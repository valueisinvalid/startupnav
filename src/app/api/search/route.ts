import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { startupName: { contains: q, mode: "insensitive" } },
        { fundingAmount: { contains: q, mode: "insensitive" } },
        { content: { contains: q, mode: "insensitive" } },
      ],
    },
    orderBy: { publishedAt: "desc" },
    take: 8,
    select: {
      slug: true,
      title: true,
      startupName: true,
      fundingAmount: true,
    },
  });

  return NextResponse.json({ results });
}
