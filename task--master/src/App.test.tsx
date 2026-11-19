import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockTasks = [
  {
    id: 1,
    title: 'Complete Data Structures Lab Sheet',
    category: 'Study',
    dueDate: '2026-10-18',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Submit Hostel Mess Fee Receipt',
    category: 'Personal',
    dueDate: '2026-10-20',
    status: 'Completed',
  },
];

describe('TaskTrackr Dashboard', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockTasks });
  });

  test('renders tasks correctly after fetching', async () => {
    render(<App />);

    expect(await screen.findByText('Complete Data Structures Lab Sheet')).toBeInTheDocument();
    expect(screen.getByText('Submit Hostel Mess Fee Receipt')).toBeInTheDocument();
  });

  test('toggles task status and updates UI dynamically', async () => {
    render(<App />);

    const toggleButton = await screen.findByRole('button', { name: /pending/i });
    fireEvent.click(toggleButton);

    await waitFor(() => {
      // Completed count should increase to 2
      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });

  test('filters tasks by search input', async () => {
    render(<App />);
    await screen.findByText('Complete Data Structures Lab Sheet');

    const searchInput = screen.getByLabelText(/search tasks by title/i);
    fireEvent.change(searchInput, { target: { value: 'Hostel' } });

    expect(screen.queryByText('Complete Data Structures Lab Sheet')).not.toBeInTheDocument();
    expect(screen.getByText('Submit Hostel Mess Fee Receipt')).toBeInTheDocument();
  });

  test('displays error message when task fetching fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
    render(<App />);

    expect(
      await screen.findByText(/failed to load tasks\. please verify your connection/i)
    ).toBeInTheDocument();
  });
});