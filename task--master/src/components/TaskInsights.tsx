import React, { useMemo } from 'react';
import { Grid, Paper, Typography, LinearProgress, Stack, Divider } from '@mui/material';
import { Task } from '../types/task';

export default function TaskInsights({ tasks }: { tasks: Task[] }) {
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const highPriorityPending = tasks.filter(
      (t) => !t.completed && t.priority === 'High'
    ).length;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    const byCategory = tasks.reduce<Record<string, number>>((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});

    return { total, completed, pending, highPriorityPending, completionRate, byCategory };
  }, [tasks]);

  return (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Paper elevation={1} sx={{ p: 2.5, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Total Tasks</Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>{stats.total}</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Paper elevation={1} sx={{ p: 2.5, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Completed</Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }} color="success.main">{stats.completed}</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Paper elevation={1} sx={{ p: 2.5, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Pending</Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }} color="warning.main">{stats.pending}</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Paper elevation={1} sx={{ p: 2.5, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">High Priority Due</Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }} color="error.main">{stats.highPriorityPending}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
        <Stack direction="row" sx={{ mb: 1, justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 600 }}>Overall Completion Rate</Typography>
          <Typography sx={{ fontWeight: 700 }} color="primary">{stats.completionRate}%</Typography>
        </Stack>
        <LinearProgress variant="determinate" value={stats.completionRate} sx={{ height: 10, borderRadius: 5 }} />
      </Paper>

      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>Tasks by Category</Typography>
        {Object.keys(stats.byCategory).length === 0 ? (
          <Typography variant="body2" color="text.secondary">No category data available yet.</Typography>
        ) : (
          <Stack divider={<Divider />} spacing={1.5} sx={{ mt: 1 }}>
            {Object.entries(stats.byCategory).map(([category, count]) => (
              <Stack key={category} direction="row" sx={{ justifyContent: 'space-between' }}>
                <Typography>{category}</Typography>
                <Typography sx={{ fontWeight: 600 }}>{count} tasks</Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </Paper>
    </Stack>
  );
}