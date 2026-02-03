import Link from 'next/link';
import clsx from 'clsx';
import type { ActivityItem } from '@/types/ui';
import { formatDateWithAnomaly } from '@/lib/horror/utils';
import styles from './ActivityList.module.css';
import horrorStyles from '@/styles/horror.module.css';

interface ActivityListProps {
  items: ActivityItem[];
}

export function ActivityList({ items }: ActivityListProps) {
  if (items.length === 0) {
    return <div className={styles.emptyState}>アクティビティはありません</div>;
  }

  return (
    <ul className={styles.activityList}>
      {items.map((item) => {
        const dateInfo = formatDateWithAnomaly(item.timestamp);
        const isSevere =
          item.type === 'anomaly' && item.meta.level === 'severe';
        const isAnomalyBg =
          item.type === 'anomaly' && !isSevere;

        return (
          <li
            key={item.id}
            className={clsx(
              styles.activityItem,
              isAnomalyBg && styles.anomalyItem,
              (isSevere || (item.type === 'inbox' && item.isHorror)) &&
                styles.horrorItem,
            )}
          >
            <div className={styles.activityIcon}>{item.icon}</div>
            <div className={styles.activityBody}>
              <div className={styles.activityHeader}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={clsx(
                      styles.activityTitleLink,
                      item.isHorror && horrorStyles.horrorText,
                    )}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <span
                    className={clsx(
                      styles.activityTitle,
                      (isSevere || item.isHorror) && horrorStyles.horrorText,
                    )}
                  >
                    {item.title}
                  </span>
                )}
                <span
                  className={clsx(
                    styles.badge,
                    item.type === 'inbox'
                      ? styles.badgeInbox
                      : styles.badgeAnomaly,
                  )}
                >
                  {item.type === 'inbox' ? '受信箱' : 'アノマリー'}
                </span>
              </div>
              <div className={styles.activityDescription}>
                {item.description}
              </div>
              <div
                className={clsx(
                  styles.activityTimestamp,
                  dateInfo.isAnomalous && horrorStyles.anomalousDate,
                )}
              >
                {dateInfo.formatted}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
