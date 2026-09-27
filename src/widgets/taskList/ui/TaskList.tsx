import type { Task } from 'entities/task/model/types';
import type { Filter } from 'widgets/taskList/model/useTasks';
import { TaskCard } from 'entities/task/ui/TaskCard';
import { FilterButton } from 'shared/ui/FilterButton';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: Task[];
  filter: Filter;
  setFilter: (f: Filter) => void;
  removeTask: (id: string) => void;
}

export function TaskList({ tasks, filter, setFilter, removeTask }: TaskListProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <FilterButton label="Все" value="all" active={filter} onClick={setFilter} />
        <FilterButton label="Завершённые" value="completed" active={filter} onClick={setFilter} />
        <FilterButton label="Незавершённые" value="incomplete" active={filter} onClick={setFilter} />
      </div>
      <div className={styles.list}>
        {tasks.length === 0 ? (
          <p className={styles.empty}>Нет задач</p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onRemove={removeTask} />
          ))
        )}
      </div>
    </div>
  );
}
