import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack, Chip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography color="primary" sx={{ fontSize: 24 }} aria-hidden="true">
            ✓
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }} color="text.primary">
            TaskTrackr
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            component={NavLink}
            to="/tasks"
            sx={{ '&.active': { bgcolor: 'primary.main', color: 'white' } }}
          >
            Task List
          </Button>
          <Button
            component={NavLink}
            to="/insights"
            sx={{ '&.active': { bgcolor: 'primary.main', color: 'white' } }}
          >
            Insights
          </Button>
        </Stack>

        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Chip label={`Hi, ${user.username}`} variant="outlined" size="small" />
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}