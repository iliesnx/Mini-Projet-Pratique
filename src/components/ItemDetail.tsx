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
  const [liked, setLiked] = useState(false);

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

  useEffect(() => {
    if (id) {
      const likedMovies = JSON.parse(localStorage.getItem('likedMovies') || '[]');
      setLiked(likedMovies.includes(id));
    }
  }, [id]);

  const toggleLike = () => {
    const likedMovies = JSON.parse(localStorage.getItem('likedMovies') || '[]');
    if (liked) {
      const updated = likedMovies.filter((movieId: string) => movieId !== id);
      localStorage.setItem('likedMovies', JSON.stringify(updated));
    } else {
      likedMovies.push(id);
      localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    }
    setLiked(!liked);
  };

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
      <button onClick={toggleLike}>
        {liked ? '❤️ Aimé' : '🤍 Aimer'}
      </button>
      <br />
      <Link to="/items">Retour à la liste</Link>
    </div>
  );
};

export default ItemDetail;