import styles from './Header.module.css';
import { useTheme } from '../../contexts/ChangeTheme'; 
import { useTranslation } from 'react-i18next'; 

interface HeaderProps {
    selectedItemsCount: number;
    onArchive: () => void;
}

export function Header({ selectedItemsCount, onArchive }: HeaderProps) {
    const hasSelection = selectedItemsCount > 0;
    const { theme, toggleTheme } = useTheme();
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: 'pt' | 'en') => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className={styles.header}>
            <div>
                <button onClick={onArchive} disabled={!hasSelection}>
                    {t('archive')}
                </button>
                {hasSelection && <span>{t('selected_items', { count: selectedItemsCount })}</span>}
            </div>
            <div className={styles.controls}>
                <button onClick={() => changeLanguage('pt')}>PT</button>
                <button onClick={() => changeLanguage('en')}>EN</button>
                
                <button onClick={toggleTheme}>
                    {theme === 'light' ? t('Mudar tema') : t('Mudar tema')}
                </button>
            </div>
        </header>
    );
}