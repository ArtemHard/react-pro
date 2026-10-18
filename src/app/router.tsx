import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskPage } from 'pages/tasks/ui/TaskPage';
import { RegistrationPage } from 'pages/registration/ui/RegistrationPage';
import { TimerPage } from 'pages/timer/ui/TimerPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/timer" replace />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/timer" element={<TimerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
