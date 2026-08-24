import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { notifySubscribers } from "@/lib/newsletter";

/**
 * Yeni yazı bildirimi tetikleyici.
 * Authorization: Bearer <ADMIN_PASSWORD>
 * Body (opsiyonel): { "slug": "yazı-slug" } — yoksa son yayınlanmamış yazı
 */
export async function POST(request: Request) {
  try {
    const auth = request.headers.get("authorization") || "";
    const token = auth.replace(/^Bearer\s+/i, "").trim();
    const adminPassword = process.env.ADMIN_PASSWORD || "startupnav2026";

    if (token !== adminPassword) {
      return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const slug = body.slug ? String(body.slug) : null;

    const post = slug
      ? await prisma.post.findUnique({ where: { slug } })
      : await prisma.post.findFirst({
          where: { notified: false },
          orderBy: { publishedAt: "desc" },
        });

    if (!post) {
      return NextResponse.json(
        { error: "Bildirilecek yazı bulunamadı." },
        { status: 404 }
      );
    }

    const result = await notifySubscribers(post);

    if (!result.skipped) {
      await prisma.post.update({
        where: { id: post.id },
        data: { notified: true },
      });
    }

    return NextResponse.json({
      post: post.slug,
      ...result,
    });
  } catch (err) {
    console.error("[notify]", err);
    return NextResponse.json(
      { error: "Bildirim gönderilemedi." },
      { status: 500 }
    );
  }
}
