import './UserLogin.module.css';

import md5 from 'md5';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {

  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    const hashedPassword = md5(password);
    console.log("Hashed Password:", hashedPassword);

    fetch(`/user/?username=${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Benutzer');
        }
        return response.json();
      })
      .then(user => {
        if (user.length === 0) {
          setUsernameError('Benutzername nicht gefunden');
          setTimeout(() => setUsernameError(''), 2000);
          return;
        }
        if (user[0].password !== hashedPassword) {
          setPasswordError('Passwort nicht korrekt');
          setTimeout(() => setPasswordError(''), 2000);
          return;
        }
        localStorage.setItem('username', username);
        navigate('/');
      })
      .catch(error => console.warn('Fehler: ', error));
  }

  const handleNewUser = (event) => {
    event.preventDefault();

    const hashedPassword = md5(password);
    const newUser = {
      username: username,
      password: hashedPassword,
      favorites: []
    };

    fetch('/user/new-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    }).then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          setUsernameError(errorData.error || 'Fehler beim Abrufen der User');
          setTimeout(() => setUsernameError(''), 2000);
          throw new Error(errorData.error || 'Fehler beim Abrufen der User');
        });
      }
      return response.json();
    }).then(user => {
      console.log('Neuen Nutzer erstellt: ', user);
      localStorage.setItem('username', username);
      navigate('/');
    }).catch(error => console.warn('Fehler: ', error));
  }

  return (
    <>
      <form>
        <legend>Login</legend>

        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          name='username'
          value={username}
          onChange={event => setUsername(event.target.value)}
        ></input>
        {usernameError && <small className="error">{usernameError}</small>}

        <br></br>

        <label htmlFor='password'>Passwort</label>
        <input
          id='password'
          type='password'
          name='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
        ></input>
        {passwordError && <small className="error">{passwordError}</small>}

        <br></br>

        <button className="submit_btn" type="button" onClick={handleLogin}>
          Login
        </button>

        <button className="submit_btn" type="button" onClick={handleNewUser}>
          Registrieren
        </button>

      </form>
    </>
  )
}

export default UserLogin;