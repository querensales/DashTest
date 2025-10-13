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
    onSubMenuClick: (id: number) => void;
    selectedId: number | null;
}

export function Sidebar({ onSubMenuClick, selectedId }: SidebarProps) {
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
            <nav>
                <ul>
                    {menus.map(menu => (
                        <li key={menu.id}>
                            <span>{menu.name}</span>
                            {menu.subMenus && (
                                <ul>
                                    {menu.subMenus.map(subMenu => {
                                        const isSelected = selectedId === subMenu.id;

                                        return (
                                            <li key={subMenu.id}>
                                                <button
                                                    className={isSelected ? styles.selected : ''}
                                                    onClick={() => onSubMenuClick(subMenu.id)}>
                                                    {subMenu.name}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}