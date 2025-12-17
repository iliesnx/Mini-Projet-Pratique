import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailInput from './Commentaires';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleEmailError = (error: string) => {
    setEmailError(error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('Message envoyé (pas vraiment)');
  };

  return (
    <div>
      <h1>Contactez-nous</h1>
      <p>Envoyez-nous votre avis sur le site.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <EmailInput
          value={email}
          onChange={handleEmailChange}
          onError={handleEmailError}
        />
        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Envoyer</button>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
      <br />
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
};

export default Contact;