import React from 'react';
import { Container, Typography, Stack, Box } from '@mui/material';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import TaskInsights from '../components/TaskInsights';

export default function InsightsPage() {
  const { state } = useTasks();
  const { user } = useAuth();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Productivity Insights — {user?.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Real-time overview of your task execution and category distribution.
          </Typography>
        </Box>
        <TaskInsights tasks={state.tasks} />
      </Stack>
    </Container>
  );
}