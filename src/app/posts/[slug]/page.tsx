import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PostCard from "@/components/PostCard";
import { prisma } from "@/lib/prisma";
import { formatFullDate, formatRelativeDate } from "@/lib/utils";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return { title: "Yazı bulunamadı" };
  return {
    title: post.title,
    description: `${post.startupName} — ${post.fundingAmount}`,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) notFound();

  return (
    <SiteLayout>
      <PostCard post={post} excerpt={false} fullPage />
      <footer className="post-after">
        <p className="post-after-date">
          {formatRelativeDate(post.publishedAt)} · Yayın:{" "}
          {formatFullDate(post.publishedAt)}
        </p>
        <Link href="/" className="post-after-back">
          ← Tüm yazılar
        </Link>
      </footer>
    </SiteLayout>
  );
}
