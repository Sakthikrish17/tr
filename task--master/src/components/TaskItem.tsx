import React, { memo } from 'react';
import { Paper, Checkbox, Typography, Chip, IconButton, Stack, Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import { Task, Priority } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const priorityColors: Record<Priority, 'error' | 'warning' | 'success'> = {
  High: 'error',
  Medium: 'warning',
  Low: 'success',
};

const TaskItem = memo(function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: task.completed ? 'action.hover' : 'background.paper',
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'text.secondary' : 'text.primary',
              fontWeight: 600,
            }}
          >
            {task.title}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 0.5, alignItems: 'center' }}>
            <Chip label={task.category} size="small" color="primary" variant="outlined" />
            <Chip label={task.priority} size="small" color={priorityColors[task.priority]} />
            <Typography variant="caption" color="text.secondary">
              Due: {task.dueDate}
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <IconButton color="error" onClick={() => onDelete(task.id)} aria-label="Delete task">
        <DeleteOutlineIcon />
      </IconButton>
    </Paper>
  );
});

export default TaskItem;