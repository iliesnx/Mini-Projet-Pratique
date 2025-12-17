import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Item {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const Items: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('naruto');
  const [searchTerm, setSearchTerm] = useState('naruto');
  const [ratings, setRatings] = useState<{[key: string]: number}>({});

  useEffect(() => {
    setRatings(JSON.parse(localStorage.getItem('movieRatings') || '{}'));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=c5fa73d5`)
      .then(response => response.json())
      .then(data => {
        if (data.Search) {
          setItems(data.Search);
        } else {
          setItems([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [searchTerm]);

  if (loading) return <div>Loading</div>;

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un film..."
        style={{ marginBottom: '20px', padding: '10px', width: '100%', maxWidth: '400px' }}
      />
      <button onClick={() => setSearchTerm(query)} style={{ padding: '10px', marginLeft: '10px' }}>Rechercher</button>
      <h1>Liste des Films</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
        {items.map(item => {
          const rating = ratings[item.imdbID] || 0;
          return (
            <Link key={item.imdbID} to={`/items/${item.imdbID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px', borderRadius: '8px', height: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {item.Poster && item.Poster !== 'N/A' ? (
                  <img src={item.Poster} alt={item.Title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
                ) : (
                  <div style={{ width: '100%', height: '200px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>No Image</div>
                )}
                <p style={{ margin: '10px 0', fontWeight: 'bold', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.Title}</p>
                <div style={{ marginTop: 'auto' }}>
                  {[1, 2, 3, 4, 5].map(num => (
                    <span key={num} style={{ fontSize: '16px', color: num <= rating ? '#ffd700' : '#ccc' }}>
                      {num <= rating ? '★' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
};

export default Items;