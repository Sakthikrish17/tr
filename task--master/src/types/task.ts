export type Priority = 'High' | 'Medium' | 'Low';
export type FilterStatus = 'ALL' | 'COMPLETED' | 'PENDING';

export interface Task {
  id: number;
  title: string;
  category: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
}

export interface User {
  username: string;
  email: string;
}

export interface TaskState {
  tasks: Task[];
  filterStatus: FilterStatus;
  filterCategory: string;
  searchQuery: string;
  loading: boolean;
}

export type TaskAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'TOGGLE_TASK'; payload: number }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'SET_FILTER_STATUS'; payload: FilterStatus }
  | { type: 'SET_FILTER_CATEGORY'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string };