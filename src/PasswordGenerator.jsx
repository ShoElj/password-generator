import React, { useState } from 'react';
import './PasswordGenerator.css';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [showToast, setShowToast] = useState(false);

  const generatePassword = () => {
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let allChars = lowerCaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;
    if (includeUppercase) allChars += upperCaseChars;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      newPassword += allChars[randomIndex];
    }

    setPassword(newPassword);
    evaluateStrength(newPassword);
  };

  const evaluateStrength = (password) => {
    let strength = 'Weak';
    if (password.length > 8) strength = 'Moderate';
    if (password.length > 12 && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*]/.test(password)) {
      strength = 'Strong';
    }

    setStrength(strength);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <label>
        Password Length:
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          min="6"
          max="128"
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={includeNumbers}
          onChange={(e) => setIncludeNumbers(e.target.checked)}
        />
        Include Numbers
      </label>

      <label>
        <input
          type="checkbox"
          checked={includeSymbols}
          onChange={(e) => setIncludeSymbols(e.target.checked)}
        />
        Include Symbols
      </label>

      <label>
        <input
          type="checkbox"
          checked={includeUppercase}
          onChange={(e) => setIncludeUppercase(e.target.checked)}
        />
        Include Uppercase Letters
      </label>

      <button onClick={generatePassword}>Generate Password</button>

      <div className="output">
        <input type="text" value={password} readOnly id="password" />
        <button onClick={copyPassword}>Copy</button>
      </div>

      <div id="strength">Strength: {strength}</div>

      {showToast && <div className="toast">Password Copied!</div>}
    </div>
  );
};

export default PasswordGenerator;
