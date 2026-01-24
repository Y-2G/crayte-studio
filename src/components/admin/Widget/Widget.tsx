import styles from './Widget.module.css';

interface WidgetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export function Widget({ title, children, className, actions }: WidgetProps) {
  return (
    <div className={`${styles.widget} ${className || ''}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
