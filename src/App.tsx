import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import Layout from './components/Layout';
import Home from './pages/Home';
import Company from './pages/Company';
import Construction from './pages/Construction';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/company" element={<Company />} />
              <Route path="/construction" element={<Construction />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
