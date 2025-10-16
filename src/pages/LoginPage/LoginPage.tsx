import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const [user, setUser] = useState('Admin');
  const [pass, setPass] = useState('Admin');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isLoginSuccessful = login(user, pass);
    if (isLoginSuccessful) {
      navigate('/');
    } else {
      alert('Credenciais inválidas!');
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="user">Usuário:</label>
            <input 
              id="user"
              type="text" 
              value={user} 
              onChange={(e) => setUser(e.target.value)} 
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="pass">Senha:</label>
            <input 
              id="pass"
              type="password" 
              value={pass} 
              onChange={(e) => setPass(e.target.value)} 
            />
          </div>
          <button type="submit" className={styles.submitButton}>Entrar</button>
        </form>
      </div>
    </div>
  );
}