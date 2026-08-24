import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function emailFrom(request: Request) {
  const { searchParams } = new URL(request.url);
  return (searchParams.get("email") || "").trim().toLowerCase();
}

async function removeSubscriber(email: string) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return false;
  }
  await prisma.subscriber.deleteMany({ where: { email } });
  return true;
}

export async function POST(request: Request) {
  const email = emailFrom(request);
  await removeSubscriber(email);
  return new NextResponse(null, { status: 200 });
}

export async function GET(request: Request) {
  const email = emailFrom(request);
  await removeSubscriber(email);

  return new NextResponse(
    `<!DOCTYPE html><html lang="tr"><body style="font-family:sans-serif;padding:40px;color:#24262c;">
      <p>Abonelikten çıktın. Artık bülten maili gelmeyecek.</p>
    </body></html>`,
    {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    },
  );
}
