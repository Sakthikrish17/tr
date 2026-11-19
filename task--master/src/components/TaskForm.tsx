import React, { useState } from 'react';
import { Paper, Typography, Grid, TextField, MenuItem, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTasks } from '../context/TaskContext';
import { Priority } from '../types/task';

interface FormErrors {
  title?: string;
  dueDate?: string;
}

export default function TaskForm() {
  const { dispatch } = useTasks();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Development');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Task title is required.';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters.';
    }

    if (!dueDate) {
      newErrors.dueDate = 'Please select a due date.';
    } else {
      const today = new Date().toISOString().split('T')[0];
      if (dueDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch({
      type: 'ADD_TASK',
      payload: {
        id: Date.now(),
        title: title.trim(),
        category,
        priority,
        dueDate,
        completed: false,
      },
    });

    setTitle('');
    setDueDate('');
    setErrors({});
  };

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
        Add New Task
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={Boolean(errors.title)}
              helperText={errors.title}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="Development">Development</MenuItem>
              <MenuItem value="Learning">Learning</MenuItem>
              <MenuItem value="Career">Career</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Due Date"
              slotProps={{ inputLabel: { shrink: true } }}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              error={Boolean(errors.dueDate)}
              helperText={errors.dueDate}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" startIcon={<AddIcon />} sx={{ mt: 2 }}>
          Add Task
        </Button>
      </Box>
    </Paper>
  );
}