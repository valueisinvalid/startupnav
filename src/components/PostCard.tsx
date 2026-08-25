import Link from "next/link";
import { formatRelativeDate } from "@/lib/utils";

export type PostCardData = {
  slug: string;
  title: string;
  startupName: string;
  fundingAmount: string;
  content: string;
  imageUrl: string;
  imageSize?: string | null;
  publishedAt: Date | string;
};

type Props = {
  post: PostCardData;
  excerpt?: boolean;
  fullPage?: boolean;
};

function renderInlineMarkdown(text: string) {
  const parts: (string | React.ReactElement)[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer">
        {match[1]}
      </a>,
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function renderBody(content: string) {
  return content
    .split("\n")
    .filter(Boolean)
    .map((line, i) => {
      const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgMatch) {
        return (
          <figure key={i} className="post-body-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgMatch[2]} alt={imgMatch[1]} />
          </figure>
        );
      }
      return <p key={i}>{renderInlineMarkdown(line)}</p>;
    });
}

export default function PostCard({ post, excerpt = true, fullPage = false }: Props) {
  const body = excerpt
    ? post.content.split("\n").filter(Boolean)[0]
    : post.content;

  return (
    <article
      className={`post-card${fullPage ? " post-card--full" : ""}`}
      id={post.slug}
    >
      <div className="post-card-inner">
        <div className="post-meta">
          <Link href={`/posts/${post.slug}`}>startupnav</Link>
          <span className="post-meta-sep" aria-hidden>
            ·
          </span>
          <span lang="en" className="post-meta-funding">
            {post.fundingAmount}
          </span>
        </div>

        {post.imageUrl ? (
          <Link
            href={`/posts/${post.slug}`}
            className={`post-media post-media--${post.imageSize || "md"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.imageUrl} alt={post.startupName} />
          </Link>
        ) : null}

        <p className="post-caption">{post.startupName}</p>

        <h2 className="post-title">
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h2>

        <div className="post-body">
          {excerpt ? (
            <p>
              {body}{" "}
              <Link href={`/posts/${post.slug}`} className="post-more">
                devamını oku →
              </Link>
            </p>
          ) : (
            renderBody(body)
          )}
        </div>

        {!fullPage ? (
          <footer className="post-foot">
            <Link href={`/posts/${post.slug}`}>
              {formatRelativeDate(post.publishedAt)}
            </Link>
          </footer>
        ) : null}
      </div>
    </article>
  );
}
