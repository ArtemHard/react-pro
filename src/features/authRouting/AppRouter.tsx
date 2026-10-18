import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { TaskPage } from 'pages/tasks/ui/TaskPage';
import { RegistrationPage } from 'pages/registration/ui/RegistrationPage';
import { TimerPage } from 'pages/timer/ui/TimerPage';
import { AuthProvider } from './AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { LoginPage } from './LoginPage';
import { ProfilePage } from './ProfilePage';
import { PublicPage } from './PublicPage';

export function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/public" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/public" element={<PublicPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/timer" element={<TimerPage />} />

          <Route path="*" element={<Navigate to="/public" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
