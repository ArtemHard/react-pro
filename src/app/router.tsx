import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskPage } from 'pages/tasks/ui/TaskPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}
