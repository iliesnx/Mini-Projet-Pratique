import React, { useState } from 'react';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  onError: (error: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange, onError }) => {
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    if (newValue && !validateEmail(newValue)) {
      onError('Format d\'email invalide');
    } else {
      onError('');
    }
  };

  return (
    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={value}
        onChange={handleChange}
        style={{ borderColor: 'initial' }}
      />
    </div>
  );
};

export default EmailInput;