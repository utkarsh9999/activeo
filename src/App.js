import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import Test from './components/Test';
import UserDashboard from './components/UserDashboard';
import { AuthProvider, useAuth } from './AuthContext';
import UserCourses from './components/UserCourses';
import UserCourse from './components/UserCourse';
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/file" element={<Test />} />
          <Route path="/user-dashboard" element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          } />
          <Route path="/user-courses" element={
            <PrivateRoute>
              < UserCourses />
            </PrivateRoute>
          } />
          <Route path="/user-course/:course_id" element={
            <PrivateRoute>
              < UserCourse />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
