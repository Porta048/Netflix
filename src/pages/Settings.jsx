import React, { useState, useEffect } from 'react';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    // Simulazione fetch settings
    setTimeout(() => {
      // Simula errore random
      if (Math.random() < 0.2) {
        setError('Errore nel caricamento impostazioni!');
      } else {
        setSettings({ theme: 'Dark', notifications: true });
      }
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  }
  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }
  return (
    <div className="text-light">
      <h2>Settings</h2>
      <p><b>Tema:</b> {settings.theme}</p>
      <p><b>Notifiche:</b> {settings.notifications ? 'Attive' : 'Disattivate'}</p>
    </div>
  );
} 