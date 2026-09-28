import { memo } from 'react';
import type { Task } from 'entities/task/model/types';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onRemove?: (id: number) => void;
}

export const TaskCard = memo(function TaskCard({ task, onRemove }: TaskCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.status}>
        {task.completed ? '✅' : '⬜'}
      </span>
      <span className={`${styles.title} ${task.completed ? styles.completed : ''}`}>
        {task.title}
      </span>
      {onRemove && (
        <button className={styles.removeBtn} onClick={() => onRemove(task.id)}>
          ✕
        </button>
      )}
    </div>
  );
});
