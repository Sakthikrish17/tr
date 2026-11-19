import React from 'react';
import { Paper, Typography, Stack } from '@mui/material';
import { Task } from '../types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
        <Typography color="text.secondary">No tasks match your current filters.</Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={1.5}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </Stack>
  );
}