import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const API_KEY = '55d58666';

export default function SearchBar({ onSearchResults }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Determina il placeholder in base alla pagina corrente
  const getPlaceholder = () => {
    if (location.pathname === '/tv-shows') {
      return 'Cerca Serie TV...';
    }
    return 'Cerca Film...';
  };

  // Determina il tipo di ricerca in base alla pagina
  const getSearchType = () => {
    if (location.pathname === '/tv-shows') {
      return 'series';
    }
    return 'movie';
  };

  useEffect(() => {
    const searchMovies = async () => {
      if (searchTerm.trim().length < 3) {
        setSearchResults([]);
        setShowResults(false);
        setError(null);
        return;
      }

      setIsSearching(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&type=${getSearchType()}`
        );
        const data = await response.json();

        if (data.Response === 'True') {
          setSearchResults(data.Search.slice(0, 8)); // Limita a 8 risultati
          setShowResults(true);
        } else {
          setSearchResults([]);
          setError(data.Error || 'Nessun risultato trovato');
        }
      } catch (err) {
        setError('Errore di connessione. Riprova più tardi.');
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    // Debounce per evitare troppe chiamate API
    const timeoutId = setTimeout(searchMovies, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, location.pathname]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleResultClick = (movie) => {
    setShowResults(false);
    setSearchTerm('');
    navigate(`/movie-details/${movie.imdbID}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleResultClick(searchResults[0]);
    }
  };

  const handleFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleBlur = () => {
    // Delay per permettere il click sui risultati
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit} className="d-flex align-items-center">
        <div className="position-relative flex-grow-1">
          <input
            type="text"
            className="form-control search-input"
            placeholder={getPlaceholder()}
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <i className="bi bi-search search-icon" />
          {isSearching && (
            <div className="search-spinner">
              <div className="spinner-border spinner-border-sm text-light" role="status">
                <span className="visually-hidden">Ricerca...</span>
              </div>
            </div>
          )}
        </div>
      </form>

      {/* Risultati della ricerca */}
      {showResults && (
        <div className="search-results">
          <div className="card bg-dark border-secondary">
            <div className="card-body p-0">
              {error ? (
                <div className="search-error">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              ) : searchResults.length > 0 ? (
                <div className="search-results-list">
                  {searchResults.map((movie) => (
                    <div
                      key={movie.imdbID}
                      className="search-result-item"
                      onClick={() => handleResultClick(movie)}
                    >
                      <img
                        src={movie.Poster !== 'N/A' ? movie.Poster : '/assets/logo.png'}
                        alt={movie.Title}
                        className="search-result-poster"
                        onError={(e) => {
                          e.target.src = '/assets/logo.png';
                        }}
                      />
                      <div className="search-result-info">
                        <div className="search-result-title">{movie.Title}</div>
                        <div className="search-result-year">{movie.Year}</div>
                      </div>
                      <i className="bi bi-chevron-right search-result-arrow"></i>
                    </div>
                  ))}
                </div>
              ) : searchTerm.length >= 3 && !isSearching ? (
                <div className="search-no-results">
                  <i className="bi bi-search me-2"></i>
                  Nessun risultato trovato
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  onSearchResults: PropTypes.func
}; 