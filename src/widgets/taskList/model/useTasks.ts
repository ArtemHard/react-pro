import { useState, useMemo } from 'react';
import type { Task } from 'entities/task/model/types';

export type Filter = 'all' | 'completed' | 'incomplete';

const initialTasks: Task[] = [
  { id: '1', title: 'Изучить FSD', completed: true },
  { id: '2', title: 'Создать проект по FSD', completed: false },
  { id: '3', title: 'Реализовать сущность Task', completed: false },
  { id: '4', title: 'Написать тесты', completed: false },
  { id: '5', title: 'Настроить ESLint и Prettier', completed: true },
];

export function useTasks(initial: Task[] = initialTasks) {
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [filter, setFilter] = useState<Filter>('all');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter((t) => t.completed);
      case 'incomplete':
        return tasks.filter((t) => !t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks: filteredTasks, filter, setFilter, removeTask };
}
