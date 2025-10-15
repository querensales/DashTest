import styles from './Header.module.css';
import { useTheme } from '../../contexts/ChangeTheme'; 
import { useTranslation } from 'react-i18next'; 
import i18n from '../../i18n';

interface HeaderProps {
    selectedItemsCount: number;
    onArchive: () => void;
}


export function Header({ selectedItemsCount, onArchive }: HeaderProps) {
    const hasSelection = selectedItemsCount > 0;
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();

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
                    {theme === 'light' ? t('Mudar tema') : t('Mudar tema')}
                </button>
            </div>
        </header>
    );
}