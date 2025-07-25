import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Account = lazy(() => import('./pages/Account.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container-fluid px-4">
        <nav className="mb-4">
          <Link to="/" className="btn btn-outline-light btn-sm me-2">Home</Link>
          <Link to="/account" className="btn btn-outline-light btn-sm me-2">Account</Link>
          <Link to="/settings" className="btn btn-outline-light btn-sm">Settings</Link>
        </nav>
        <Suspense fallback={<div className="text-center py-5"><div className="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </Router>
  );
}