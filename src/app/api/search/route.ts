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
        { title: { contains: q } },
        { startupName: { contains: q } },
        { fundingAmount: { contains: q } },
        { content: { contains: q } },
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
