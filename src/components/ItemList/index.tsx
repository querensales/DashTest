import { useEffect, useState } from 'react';
import styles from './ItemList.module.css';
import type { Item } from '../../types';
import { ItemCard } from '../ItemCard';

interface ItemListProps {
    selectedId: number | null;
}

export function ItemList({ selectedId }: ItemListProps) {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);



    

    if (!selectedId) {
        return <div className={styles.container}>Selecione um item no menu para ver os resultados.</div>;
    }

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
                                onSelect={handleSelectItem}
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