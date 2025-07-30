import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_KEY = '55d58666';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch dettagli del film da OMDB API
        const movieResponse = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}&plot=full`);
        const movieData = await movieResponse.json();

        if (movieData.Response === 'True') {
          setMovie(movieData);
        } else {
          setError('Film non trovato');
          return;
        }

        // Fetch commenti dalle API interne (simulato)
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5`);
        const commentsData = await commentsResponse.json();
        
        // Trasformo i dati per simulare commenti sui film
        const movieComments = commentsData.map((comment, index) => ({
          id: comment.id,
          author: `User${comment.id}`,
          rating: Math.floor(Math.random() * 5) + 1,
          text: comment.body,
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('it-IT')
        }));

        setComments(movieComments);
      } catch (err) {
        setError('Errore di connessione. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center py-5">
          <div className="spinner-border text-light mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Caricamento...</span>
          </div>
          <div className="text-light">
            <h5>Caricamento dettagli film...</h5>
            <p className="text-muted">Stiamo recuperando le informazioni</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center justify-content-center py-5" role="alert">
          <i className="bi bi-exclamation-triangle me-3 fs-2"></i>
          <div className="text-center">
            <h5 className="mb-2">Errore nel caricamento del film</h5>
            <p className="mb-3">{error}</p>
            <div>
              <Link to="/" className="btn btn-primary me-2">
                <i className="bi bi-arrow-left me-2"></i>
                Torna alla Home
              </Link>
              <button 
                className="btn btn-outline-primary"
                onClick={() => window.location.reload()}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Riprova
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-light mb-4">
        <i className="bi bi-arrow-left me-2"></i>
        Torna alla Home
      </Link>

      <div className="row">
        <div className="col-md-4">
          <img 
            src={movie.Poster !== 'N/A' ? movie.Poster : '/assets/logo.png'} 
            alt={movie.Title}
            className="img-fluid rounded shadow"
            style={{ maxWidth: '100%' }}
            onError={(e) => {
              e.target.src = '/assets/logo.png';
            }}
          />
        </div>
        <div className="col-md-8">
          <h1 className="text-light mb-3">{movie.Title}</h1>
          <div className="mb-3">
            <span className="badge bg-warning text-dark me-2">{movie.Year}</span>
            <span className="badge bg-info me-2">{movie.Runtime}</span>
            <span className="badge bg-success me-2">{movie.imdbRating}/10</span>
            <span className="badge bg-secondary">{movie.Type}</span>
          </div>
          <p className="text-light mb-3">{movie.Plot}</p>
          <div className="mb-3">
            <strong className="text-light">Genere:</strong> <span className="text-light">{movie.Genre}</span>
          </div>
          <div className="mb-3">
            <strong className="text-light">Regista:</strong> <span className="text-light">{movie.Director}</span>
          </div>
          <div className="mb-3">
            <strong className="text-light">Cast:</strong> <span className="text-light">{movie.Actors}</span>
          </div>
          <div className="mb-3">
            <strong className="text-light">Lingua:</strong> <span className="text-light">{movie.Language}</span>
          </div>
          <div className="mb-3">
            <strong className="text-light">Paese:</strong> <span className="text-light">{movie.Country}</span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-light mb-4">Commenti degli utenti</h3>
        {comments.length > 0 ? (
          <div className="row">
            {comments.map(comment => (
              <div key={comment.id} className="col-12 mb-3">
                <div className="card bg-dark text-light">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="card-title mb-0">{comment.author}</h6>
                      <div>
                        <span className="text-warning">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`bi bi-star${i < comment.rating ? '-fill' : ''}`}></i>
                          ))}
                        </span>
                        <small className="text-muted ms-2">{comment.date}</small>
                      </div>
                    </div>
                    <p className="card-text">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info">
            <i className="bi bi-info-circle me-2"></i>
            Nessun commento disponibile per questo film.
          </div>
        )}
      </div>
    </div>
  );
} 