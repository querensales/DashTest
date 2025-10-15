import styles from './Header.module.css';
// Garanta que este caminho está correto para o seu arquivo
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
                {hasSelection && (
                    <>
                        <button onClick={onArchive}>
                            {t('Arquivar')}
                        </button>
                        <span>{t('', { count: selectedItemsCount })}</span>
                    </>
                )}
            </div>
            <div className={styles.controls}>
                <button onClick={() => changeLanguage('pt')}>PT</button>
                <button onClick={() => changeLanguage('en')}>EN</button>
                
                <button onClick={toggleTheme}>
                    {theme === 'light' ? t('change_to_dark_theme') : t('change_to_light_theme')}
                </button>
            </div>
        </header>
    );
}