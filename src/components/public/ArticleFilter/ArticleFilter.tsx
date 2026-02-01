"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "./ArticleFilter.module.css";

type FilterType = "all" | "news" | "blog" | "works";

interface ArticleFilterProps {
  activeFilter: FilterType;
}

const filters: { key: FilterType; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "works", label: "制作実績" },
  { key: "news", label: "ニュース" },
  { key: "blog", label: "ブログ" },
];

export function ArticleFilter({ activeFilter }: ArticleFilterProps) {
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
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
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
  );
}
