import styles from './Header.module.css';

interface HeaderProps {
    selectedItemsCount: number;
    onArchive: () => void;
}

export function Header({ selectedItemsCount, onArchive }: HeaderProps) {
    const hasSelection = selectedItemsCount > 0;

    return (
        <header className={styles.header}>
            <div>
                <button onClick={onArchive} disabled={!hasSelection}>
                    Arquivar
                </button>
                {hasSelection && <span>{selectedItemsCount} item(s) selecionado(s)</span>}
            </div>
            
            {/*botão de logout */}
        </header>
    );
}