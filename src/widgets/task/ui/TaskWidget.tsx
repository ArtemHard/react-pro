import { useTasks } from 'widgets/taskList/model/useTasks';
import { TaskList } from 'widgets/taskList/ui/TaskList';

export function TaskWidget() {
  const { tasks, filter, setFilter, removeTask } = useTasks();

  return (
    <TaskList
      tasks={tasks}
      filter={filter}
      setFilter={setFilter}
      removeTask={removeTask}
    />
  );
}
