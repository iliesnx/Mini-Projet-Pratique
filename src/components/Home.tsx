import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Bienvenue dans le Catalogue de Contenus</h1>
      <p>Découvrez des films et séries.</p>
      <Link to="/items">Voir les éléments</Link>
    </div>
  );
};

export default Home;