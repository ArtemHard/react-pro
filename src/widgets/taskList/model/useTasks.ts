import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useGetTasksQuery } from 'entities/task/api/tasksApi';
import type { Task } from 'entities/task/model/types';

export type Filter = 'all' | 'completed' | 'incomplete';

export function useTasks() {
  const { data: remoteTasks, isLoading, error } = useGetTasksQuery();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const initializedRef = useRef(false);

  useEffect(() => {
    if (remoteTasks && !initializedRef.current) {
      setTasks(remoteTasks);
      initializedRef.current = true;
    }
  }, [remoteTasks]);

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

  const removeTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { tasks: filteredTasks, filter, setFilter, removeTask, isLoading, error };
}