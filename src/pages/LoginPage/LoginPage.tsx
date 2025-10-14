import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const loginAccount = (event: React.FormEvent) => {
        event.preventDefault();
        const isLoginSuccessful = login(user, pass);
        if (isLoginSuccessful) {
            navigate('/');
        } else {
            alert('Informações inválidas!');
        }
    };

    return (
        <div>
            <h1>Página de Login</h1>
            <form onSubmit={loginAccount}>
                <div>
                    <label>Usuário:</label>
                    <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}