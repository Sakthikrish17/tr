import { Task } from '../types/task';

const getStorageKey = (email: string) =>
  `tasktrackr_tasks_${email.toLowerCase().trim()}`;

export const fetchInitialTasks = async (userEmail: string): Promise<Task[]> => {
  const storageKey = getStorageKey(userEmail);
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    return JSON.parse(saved) as Task[];
  }
  const response = await fetch('/tasks.json');
  if (!response.ok) {
    return [];
  }
  const data = (await response.json()) as Task[];
  localStorage.setItem(storageKey, JSON.stringify(data));
  return data;
};

export const saveTasksToStorage = (userEmail: string, tasks: Task[]): void => {
  const storageKey = getStorageKey(userEmail);
  localStorage.setItem(storageKey, JSON.stringify(tasks));
};