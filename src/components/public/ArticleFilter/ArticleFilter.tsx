"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "./ArticleFilter.module.css";

export type FilterType = "all" | "news" | "blog" | "works";

interface ArticleFilterProps {
  activeFilter: FilterType;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const filters: { key: FilterType; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "works", label: "制作実績" },
  { key: "news", label: "ニュース" },
  { key: "blog", label: "ブログ" },
];

export function ArticleFilter({
  activeFilter,
  searchQuery,
  onSearchChange,
}: ArticleFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleFilter(filter: FilterType) {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterRow}>
        {filters.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={`${styles.filterButton} ${
              activeFilter === key ? styles.active : ""
            }`}
            onClick={() => handleFilter(key)}
            aria-pressed={activeFilter === key}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={styles.searchForm} role="search">
        <svg
          className={styles.searchIcon}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="記事を検索..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
