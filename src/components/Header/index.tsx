import styles from './Header.module.css';
import { useTheme } from '../../contexts/ChangeTheme';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { UserMenu } from '../UserMenu';

interface HeaderProps {
    selectedItemsCount: number;
    onArchive: () => void;
    onMenuClick: () => void;
}

export function Header({ selectedItemsCount, onArchive, onMenuClick }: HeaderProps) {
    const hasSelection = selectedItemsCount > 0;
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();

    const changeLanguage = (lng: 'pt' | 'en') => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <button className={styles.hamburgerButton} onClick={onMenuClick}>
                    ☰
                </button>


                {hasSelection && (
                    <>
                        <button onClick={onArchive}>
                            {t('archive')}
                        </button>
                        <span>{t('selected_items', { count: selectedItemsCount })}</span>
                    </>
                )}
            </div>
            <div className={styles.controls}>
                <button onClick={() => changeLanguage('pt')}>PT</button>
                <button onClick={() => changeLanguage('en')}>EN</button>

                <button
                    onClick={toggleTheme}
                    title={theme === 'light' ? t('change_to_dark_theme') : t('change_to_light_theme')}
                    className={styles.themeButton}
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>

                <UserMenu />
            </div>
        </header>
    );
}