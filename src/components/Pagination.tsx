import Link from "next/link";

type Props = {
  page: number;
  totalPages: number;
  basePath?: string;
};

export default function Pagination({ page, totalPages, basePath = "/" }: Props) {
  if (totalPages <= 1) return null;

  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;
  const label = String(page).padStart(2, "0");

  function hrefFor(target: number) {
    if (target === 1) return basePath;
    return `${basePath}?page=${target}`;
  }

  return (
    <div className="pagination" id="pagination">
      <div className="page-number">{label}</div>
      <div className="page-line" />
      <div className="page-links">
        {prev ? (
          <Link href={hrefFor(prev)} className="active">
            PREV
          </Link>
        ) : (
          <span className="disabled">PREV</span>
        )}
        {next ? (
          <Link href={hrefFor(next)} className="active">
            NEXT
          </Link>
        ) : (
          <span className="disabled">NEXT</span>
        )}
      </div>
    </div>
  );
}
