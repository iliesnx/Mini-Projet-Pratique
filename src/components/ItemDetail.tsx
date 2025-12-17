import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Item {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: any[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://www.omdbapi.com/?i=${id}&apikey=c5fa73d5`)
        .then(response => response.json())
        .then(data => {
          setItem(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!item || item.Response === 'False') return <div>Film non trouvé</div>;

  return (
    <div>
      <h1>{item.Title}</h1>
      <p><strong>Année:</strong> {item.Year}</p>
      <p><strong>Réalisateur:</strong> {item.Director}</p>
      <p><strong>Acteurs:</strong> {item.Actors}</p>
      <p><strong>Genre:</strong> {item.Genre}</p>
      <p><strong>Résumé:</strong> {item.Plot}</p>
      <p><strong>Note IMDb:</strong> {item.imdbRating}</p>
      {item.Poster && <img src={item.Poster} alt={item.Title} />}
      <Link to="/items">Retour à la liste</Link>
    </div>
  );
};

export default ItemDetail;