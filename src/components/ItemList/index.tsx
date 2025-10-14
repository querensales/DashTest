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


    useEffect(() => {
        if (!selectedId) {
            setItems([]);
            return;
        }

        setLoading(true);
        fetch(`https://my-json-server.typicode.com/EnkiGroup/desafio-front-2025-2q/items/${selectedId}`)
            .then(res => res.json())
            .then(responseObject => {
                setItems(responseObject.items || []);
                setLoading(false);
                console.log("items da api", responseObject);
            })
            .catch(error => {
                console.error("Erro ao buscar os itens:", error);
                setLoading(false);
            });

    }, [selectedId]);

    if (!selectedId) {
        return <div className={styles.container}>Selecione um item no menu para ver os resultados.</div>;
    }

    if (loading) {
        return <div className={styles.container}>Carregando itens...</div>;
    }

    return (
        <div className={styles.container}>
            {items.length > 0 ? (
                <div>
                    {items.map(item => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <p>Nenhum item encontrado.</p>
            )}
        </div>
    );
}