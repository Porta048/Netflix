import React, { useState, useEffect } from 'react';

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulazione fetch utente
    setTimeout(() => {
      // Simula errore random
      if (Math.random() < 0.2) {
        setError('Errore nel caricamento dati account!');
      } else {
        setUser({ name: 'Mario Rossi', email: 'mario.rossi@email.com' });
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
      <h2>Account</h2>
      <p><b>Nome:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
    </div>
  );
} 