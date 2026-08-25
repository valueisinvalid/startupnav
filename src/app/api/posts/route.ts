import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSlug } from "@/lib/utils";
import { notifySubscribers } from "@/lib/newsletter";

function adminPassword() {
  return process.env.ADMIN_PASSWORD || "startupnav2026";
}

function isAuthorized(password: string) {
  return password === adminPassword();
}

export async function GET(request: Request) {
  const password = request.headers.get("x-admin-password") || "";
  if (!isAuthorized(password)) {
    return NextResponse.json({ error: "Şifre hatalı." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json({ error: "Yazı bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({ post });
  }

  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      startupName: true,
      fundingAmount: true,
      imageUrl: true,
      publishedAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ posts });
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const password = String(body.password || "");
    const id = String(body.id || "");

    if (!isAuthorized(password)) {
      return NextResponse.json({ error: "Şifre hatalı." }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: "Yazı seçilmedi." }, { status: 400 });
    }

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: "Yazı silindi." });
  } catch (err) {
    console.error("[posts delete]", err);
    return NextResponse.json(
      { error: "Yazı silinirken hata oluştu." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const password = String(body.password || "");

    if (!isAuthorized(password)) {
      return NextResponse.json({ error: "Şifre hatalı." }, { status: 401 });
    }

    const id = String(body.id || "").trim();
    const title = String(body.title || "").trim();
    const startupName = String(body.startupName || "").trim();
    const fundingAmount = String(body.fundingAmount || "").trim();
    const content = String(body.content || "").trim();
    const imageUrl = String(body.imageUrl || "/images/post-phone.png").trim();

    if (!id) {
      return NextResponse.json({ error: "Yazı seçilmedi." }, { status: 400 });
    }

    if (!title || !startupName || !fundingAmount || !content) {
      return NextResponse.json(
        { error: "Tüm zorunlu alanları doldurun." },
        { status: 400 }
      );
    }

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Yazı bulunamadı." }, { status: 404 });
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        startupName,
        fundingAmount,
        content,
        imageUrl,
      },
    });

    return NextResponse.json({
      slug: post.slug,
      message: "Yazı güncellendi.",
    });
  } catch (err) {
    console.error("[posts patch]", err);
    return NextResponse.json(
      { error: "Yazı güncellenirken hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = String(body.password || "");

    if (!isAuthorized(password)) {
      return NextResponse.json({ error: "Şifre hatalı." }, { status: 401 });
    }

    const title = String(body.title || "").trim();
    const startupName = String(body.startupName || "").trim();
    const fundingAmount = String(body.fundingAmount || "").trim();
    const content = String(body.content || "").trim();
    const imageUrl = String(body.imageUrl || "/images/post-phone.png").trim();
    const notify = Boolean(body.notify);

    if (!title || !startupName || !fundingAmount || !content) {
      return NextResponse.json(
        { error: "Tüm zorunlu alanları doldurun." },
        { status: 400 }
      );
    }

    let slug = createSlug(title);
    if (!slug) slug = `post-${Date.now()}`;

    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        startupName,
        fundingAmount,
        content,
        imageUrl,
        notified: false,
      },
    });

    let notifyInfo = "";
    if (notify) {
      const result = await notifySubscribers(post);
      if (!result.skipped) {
        await prisma.post.update({
          where: { id: post.id },
          data: { notified: true },
        });
        notifyInfo = ` ${result.sent} aboneye bildirim gönderildi.`;
      } else if (result.reason === "no_api_key") {
        notifyInfo =
          " (RESEND_API_KEY tanımlı değil — mail atlanıldı, yazı yine de yayınlandı.)";
      } else if (result.reason === "no_subscribers") {
        notifyInfo = " (Henüz abone yok.)";
      }
    }

    return NextResponse.json({
      slug: post.slug,
      message: `Yazı yayınlandı.${notifyInfo}`,
    });
  } catch (err) {
    console.error("[posts]", err);
    return NextResponse.json(
      { error: "Yazı oluşturulurken hata oluştu." },
      { status: 500 }
    );
  }
}
