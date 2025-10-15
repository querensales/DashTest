import styles from './ItemList.module.css';
import type { Item } from '../../types';
import { ItemCard } from '../ItemCard';

interface ItemListProps {
  loading: boolean;
  items: Item[];
  selectedItems: number[];
  onSelectItem: (id: number) => void;
}

export function ItemList({ loading, items, selectedItems, onSelectItem }: ItemListProps) {

    if (loading) {
        return <div className={styles.container}>Carregando itens...</div>;
    }

    const isSelectionMode = selectedItems.length > 0;

    return (
        <div className={styles.container}>
            {items.length > 0 ? (
                <div>
                    {items.map(item => {
                        const isSelected = selectedItems.includes(item.id);
                        return (
                            <ItemCard
                                key={item.id}
                                item={item}
                                isSelected={isSelected}
                                isSelectionMode={isSelectionMode}
                                onSelect={onSelectItem}
                            />
                        );
                    })}
                </div>
            ) : (
                <p>Nenhum item encontrado.</p>
            )}
        </div>
    );
}