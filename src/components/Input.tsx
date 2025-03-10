import React from 'react';

interface InputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Input: React.FC<InputProps> = ({ type, value, onChange, label }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} required />
    </div>
  );
};

export default Input;
