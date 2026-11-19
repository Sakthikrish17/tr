import React, { useMemo, useCallback } from 'react';
import { Container, Stack, CircularProgress, Box } from '@mui/material';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';
import TaskList from '../components/TaskList';

export default function TasksPage() {
  const { state, dispatch } = useTasks();
  const { tasks, filterStatus, filterCategory, searchQuery, loading } = state;

  const handleToggle = useCallback(
    (id: number) => dispatch({ type: 'TOGGLE_TASK', payload: id }),
    [dispatch]
  );

  const handleDelete = useCallback(
    (id: number) => dispatch({ type: 'DELETE_TASK', payload: id }),
    [dispatch]
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        filterStatus === 'ALL' ||
        (filterStatus === 'COMPLETED' && task.completed) ||
        (filterStatus === 'PENDING' && !task.completed);
      const matchesCategory =
        filterCategory === 'ALL' || task.category === filterCategory;
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [tasks, filterStatus, filterCategory, searchQuery]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <TaskForm />
        <TaskFilter />
        <TaskList tasks={filteredTasks} onToggle={handleToggle} onDelete={handleDelete} />
      </Stack>
    </Container>
  );
}