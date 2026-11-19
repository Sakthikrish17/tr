import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { TaskAction, TaskState } from '../types/task';
import { fetchInitialTasks, saveTasksToStorage } from '../services/taskService';
import { useAuth } from './AuthContext';

interface TaskContextType {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialState: TaskState = {
  tasks: [],
  filterStatus: 'ALL',
  filterCategory: 'ALL',
  searchQuery: '',
  loading: true,
};

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, loading: false };
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    case 'SET_FILTER_STATUS':
      return { ...state, filterStatus: action.payload };
    case 'SET_FILTER_CATEGORY':
      return { ...state, filterCategory: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
}

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    if (!user) {
      dispatch({ type: 'SET_TASKS', payload: [] });
      return;
    }

    fetchInitialTasks(user.email)
      .then((tasks) => dispatch({ type: 'SET_TASKS', payload: tasks }))
      .catch(() => dispatch({ type: 'SET_TASKS', payload: [] }));
  }, [user]);

  useEffect(() => {
    if (user && !state.loading) {
      saveTasksToStorage(user.email, state.tasks);
    }
  }, [state.tasks, state.loading, user]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};