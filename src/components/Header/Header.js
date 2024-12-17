import styles from './Header.module.css';

import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
    navigate('/');
  };

  return (
    <header>
      <img src='/images/logo.svg' alt='Rezept-App, Logo' />
      <nav>
        <ul>
          <li><NavLink to='/' className={styles.link}>Home</NavLink></li>

          {username && (
            <>
              <li><NavLink to='/user-area' className={styles.link}>Mein Bereich</NavLink></li>
              <li><NavLink to='/add-recipe' className={styles.link}>Rezept Hinzufügen</NavLink></li>
            </>
          )}

          {username ? (
            <NavLink to='/' onClick={handleLogout} className={styles.login_btn}>
              Logout
            </NavLink>
          ) : (
            <NavLink to='/login' className={styles.login_btn}>
              Login
            </NavLink>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;