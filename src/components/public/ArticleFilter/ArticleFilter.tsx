"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "./ArticleFilter.module.css";

export type FilterType = "all" | "news" | "blog" | "works";

interface ArticleFilterProps {
  activeFilter: FilterType;
  searchQuery: string;
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
}: ArticleFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(searchQuery);

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

  function handleSearch() {
    const params = new URLSearchParams(searchParams.toString());
    const trimmed = inputValue.trim();
    if (trimmed) {
      params.set("q", trimmed);
    } else {
      params.delete("q");
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className={styles.searchButton}
          onClick={handleSearch}
          aria-label="検索"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
