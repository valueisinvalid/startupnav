import SiteLayout from "@/components/SiteLayout";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import QuotePuzzle from "@/components/QuotePuzzle";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const PER_PAGE = 5;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const total = await prisma.post.count();
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const current = Math.min(page, totalPages);

  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
    skip: (current - 1) * PER_PAGE,
    take: PER_PAGE,
  });

  return (
    <SiteLayout variant="feed" feedTop={current === 1 ? <QuotePuzzle /> : null}>
      {posts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-inner">
            <h2>Henüz yazı yok</h2>
            <p>
              İlk incelemeyi eklemek için{" "}
              <a href="/admin">/admin</a> sayfasını kullan veya{" "}
              <code>npm run db:seed</code> çalıştır.
            </p>
          </div>
        </div>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}

      <Pagination page={current} totalPages={totalPages} basePath="/" />
    </SiteLayout>
  );
}
