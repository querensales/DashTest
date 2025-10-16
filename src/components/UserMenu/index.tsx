import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import styles from './UserMenu.module.css';

export function UserMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logout } = useAuth();
    const { t } = useTranslation();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={styles.menuContainer}>
            <button
                className={styles.userButton}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                AD
            </button>

            {isMenuOpen && (
                <div className={styles.dropdownMenu}>
                    <button onClick={handleLogout}>
                        {t('logout')}
                    </button>
                </div>
            )}
        </div>
    );
}