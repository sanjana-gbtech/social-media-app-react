import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './utils/auth';
import Dashboard from './components/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import CreatePost from './components/CreatePost';
import HomePage from './pages/HomePage';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Login />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/create-post" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
