import { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';

interface Menu {
    id: number;
    name: string;
    subMenus: SubMenu[];
}

interface SubMenu {
    id: number;
    name: string;
}

interface SidebarProps {
    onSubMenuSelect: (id: number) => void;
}

export default function Sidebar({ onSubMenuSelect }: SidebarProps) {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://my-json-server.typicode.com/EnkiGroup/desafio-front-2025-2q/menus')
            .then(response => response.json())
            .then(receivedMenus => {
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

    return (
        <aside className={styles.sidebar}>
            <nav> <h1>
                Dados da API
            </h1>
                <ul>
                    {menus.map(menu => (
                        <li key={menu.id}>
                            <span>{menu.name}</span>
                            {menu.subMenus && (
                                <ul>
                                    {menu.subMenus.map(subMenu => (
                                        <li key={subMenu.id}>
                                            <button onClick={() => onSubMenuSelect(subMenu.id)}>{subMenu.name}</button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}