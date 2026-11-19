import React from 'react';
import { Paper, Grid, TextField, MenuItem } from '@mui/material';
import { useTasks } from '../context/TaskContext';
import { FilterStatus } from '../types/task';

export default function TaskFilter() {
  const { state, dispatch } = useTasks();

  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="Search tasks"
            value={state.searchQuery}
            onChange={(e) =>
              dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })
            }
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Status"
            value={state.filterStatus}
            onChange={(e) =>
              dispatch({
                type: 'SET_FILTER_STATUS',
                payload: e.target.value as FilterStatus,
              })
            }
          >
            <MenuItem value="ALL">All Statuses</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Category"
            value={state.filterCategory}
            onChange={(e) =>
              dispatch({ type: 'SET_FILTER_CATEGORY', payload: e.target.value })
            }
          >
            <MenuItem value="ALL">All Categories</MenuItem>
            <MenuItem value="Development">Development</MenuItem>
            <MenuItem value="Learning">Learning</MenuItem>
            <MenuItem value="Career">Career</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Paper>
  );
}