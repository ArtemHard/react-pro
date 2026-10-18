import styles from './FilterButton.module.css';

interface FilterButtonProps<T extends string> {
  label: string;
  value: T;
  active: T;
  onClick: (value: T) => void;
}

export function FilterButton<T extends string>({
  label,
  value,
  active,
  onClick,
}: FilterButtonProps<T>) {
  return (
    <button
      className={`${styles.button} ${active === value ? styles.active : ''}`}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}
