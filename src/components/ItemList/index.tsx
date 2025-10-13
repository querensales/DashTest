import { useEffect, useState } from 'react';
import styles from './ItemList.module.css';

interface Item {
    id: number;
    name: string;
    subject: string;
    owner: string;
    users: string[];
}

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
                setItems(responseObject.items);
                setLoading(false);
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
                <ul>
                    {items.map(item => (
                        <li key={item.id}>{item.name} - {item.subject}</li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum item encontrado.</p>
            )}
        </div>
    );
}