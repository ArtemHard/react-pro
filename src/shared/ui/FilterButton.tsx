import type { Filter } from 'widgets/taskList/model/useTasks';
import styles from './FilterButton.module.css';

interface FilterButtonProps {
  label: string;
  value: Filter;
  active: Filter;
  onClick: (f: Filter) => void;
}

export function FilterButton({ label, value, active, onClick }: FilterButtonProps) {
  return (
    <button
      className={`${styles.button} ${active === value ? styles.active : ''}`}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}
