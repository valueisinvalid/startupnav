import Link from "next/link";
import type { PostCardData } from "./PostCard";

type Props = {
  posts: PostCardData[];
};

function excerpt(content: string) {
  return content.split("\n").filter(Boolean)[0] ?? "";
}

export default function PostGrid({ posts }: Props) {
  return (
    <div className="post-grid">
      {posts.map((post) => {
        const preview = excerpt(post.content);

        return (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="post-grid-item"
          >
            <div className="post-grid-media">
              {post.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.imageUrl} alt={post.startupName} loading="lazy" />
              ) : (
                <div className="post-grid-placeholder" aria-hidden>
                  <span>{post.startupName.slice(0, 1)}</span>
                </div>
              )}
            </div>

            <div className="post-grid-overlay">
              <p className="post-grid-meta" lang="en">
                {post.startupName} · {post.fundingAmount}
              </p>
              <h2 className="post-grid-title">{post.title}</h2>
              <p className="post-grid-preview">{preview}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
