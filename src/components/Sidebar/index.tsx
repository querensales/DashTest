import { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';

interface Menu {
    id: number;
    label: string;
    subMenus: SubMenu[];
}

interface SubMenu {
    id: number;
    label: string;
}

export default function Sidebar() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch('https://my-json-server.typicode.com/EnkiGroup/desafio-front-2025-2q/menus')
            .then(response => response.json())
            .then(receivedMenus=> {
                setMenus(receivedMenus);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar os menus:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <aside className={styles.sidebar}>Carregando menus...</aside>;
    }


}