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

  useEffect(() => {
    fetch('http://www.omdbapi.com/?s=naruto&apikey=c5fa73d5')
      .then(response => response.json())
      .then(data => {
        if (data.Search) {
          setItems(data.Search);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading</div>;

  return (
    <div>
      <h1>Liste des Films</h1>
      <ul>
        {items.map(item => (
          <li key={item.imdbID}>
            <Link to={`/items/${item.imdbID}`}>{item.Title} ({item.Year})</Link>
          </li>
        ))}
      </ul>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
};

export default Items;