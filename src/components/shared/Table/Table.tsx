'use client';

import { useState } from 'react';
import styles from './Table.module.css';

export interface TableColumn<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface TableAction<T> {
  label: string;
  onClick: (item: T) => void;
  variant?: 'default' | 'danger';
  show?: (item: T) => boolean;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableAction<T>[];
  selectable?: boolean;
  onSelectionChange?: (selected: T[]) => void;
  className?: string;
  emptyMessage?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Table<T extends Record<string, any>>({
  columns,
  data,
  actions,
  selectable = false,
  onSelectionChange,
  className,
  emptyMessage = 'データがありません',
}: TableProps<T>) {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSelectAll = () => {
    if (selectedItems.size === data.length) {
      setSelectedItems(new Set());
      onSelectionChange?.([]);
    } else {
      const allIndices = new Set(data.map((_, i) => i));
      setSelectedItems(allIndices);
      onSelectionChange?.(data);
    }
  };

  const handleSelectItem = (index: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedItems(newSelected);
    onSelectionChange?.(data.filter((_, i) => newSelected.has(i)));
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        const modifier = sortOrder === 'asc' ? 1 : -1;
        if (aVal < bVal) return -1 * modifier;
        if (aVal > bVal) return 1 * modifier;
        return 0;
      })
    : data;

  if (data.length === 0) {
    return (
      <div className={styles.empty}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {selectable && (
              <th className={styles.checkboxCell}>
                <input
                  type="checkbox"
                  checked={selectedItems.size === data.length}
                  onChange={handleSelectAll}
                  aria-label="すべて選択"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ width: column.width }}
                className={column.sortable ? styles.sortable : ''}
                onClick={column.sortable ? () => handleSort(column.key) : undefined}
              >
                {column.label}
                {column.sortable && sortKey === column.key && (
                  <span className={styles.sortIcon}>
                    {sortOrder === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className={styles.actionsCell}>操作</th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index} className={selectedItems.has(index) ? styles.selected : ''}>
              {selectable && (
                <td className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={selectedItems.has(index)}
                    onChange={() => handleSelectItem(index)}
                    aria-label={`行${index + 1}を選択`}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
              {actions && actions.length > 0 && (
                <td className={styles.actionsCell}>
                  <div className={styles.actions}>
                    {actions.map((action, actionIndex) => {
                      if (action.show && !action.show(item)) return null;
                      return (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(item)}
                          className={`${styles.actionButton} ${
                            action.variant === 'danger' ? styles.danger : ''
                          }`}
                        >
                          {action.label}
                        </button>
                      );
                    })}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
