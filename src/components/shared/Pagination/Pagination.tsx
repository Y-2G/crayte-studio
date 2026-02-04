import Link from "next/link";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  queryParams?: Record<string, string>;
}

function buildUrl(
  basePath: string,
  page: number,
  queryParams?: Record<string, string>
): string {
  const params = new URLSearchParams();
  params.set("page", String(page));

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value) {
        params.set(key, value);
      }
    }
  }

  return `${basePath}?${params.toString()}`;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  queryParams,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Generate page numbers to display
  const pages: (number | "ellipsis")[] = [];
  const showEllipsis = totalPages > 7;

  if (showEllipsis) {
    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    // Show pages around current
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  }

  return (
    <nav className={styles.pagination} aria-label="ページネーション">
      {hasPrev ? (
        <Link
          href={buildUrl(basePath, currentPage - 1, queryParams)}
          className={styles.navButton}
          aria-label="前のページ"
        >
          ← 前へ
        </Link>
      ) : (
        <span className={`${styles.navButton} ${styles.disabled}`}>← 前へ</span>
      )}

      <div className={styles.pages}>
        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              …
            </span>
          ) : (
            <Link
              key={page}
              href={buildUrl(basePath, page, queryParams)}
              className={`${styles.pageLink} ${
                page === currentPage ? styles.active : ""
              }`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {hasNext ? (
        <Link
          href={buildUrl(basePath, currentPage + 1, queryParams)}
          className={styles.navButton}
          aria-label="次のページ"
        >
          次へ →
        </Link>
      ) : (
        <span className={`${styles.navButton} ${styles.disabled}`}>次へ →</span>
      )}
    </nav>
  );
}
