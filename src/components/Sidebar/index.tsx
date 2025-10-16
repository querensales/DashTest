import { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';

interface SubMenu {
  id: number;
  name: string;
}

interface Menu {
  id: number;
  name: string;
  subMenus: SubMenu[];
}

interface SidebarProps {
  onSubMenuClick: (id: number) => void;
  selectedId: number | null;
  isOpen: boolean;
}

export function Sidebar({ onSubMenuClick, selectedId, isOpen }: SidebarProps) {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(true);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    useEffect(() => {
        fetch('https://my-json-server.typicode.com/EnkiGroup/desafio-front-2025-2q/menus')
            .then(res => res.json())
            .then((data: Menu[]) => {
                setMenus(data);
                if (data && data.length > 0) {
                    setOpenMenuId(data[0].id);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar os menus:", error);
                setLoading(false);
            });
    }, []);

    const handleMenuToggle = (menuId: number) => {
        setOpenMenuId(prevOpenId => (prevOpenId === menuId ? null : menuId));
    };

    if (loading) {
        return <aside className={styles.sidebar}>Carregando menus...</aside>;
    }

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.isOpen : ''}`}>
            <nav>
                <ul>
                    {menus.map(menu => {
                        const isMenuOpen = openMenuId === menu.id;
                        return (
                            <li key={menu.id}>
                                <button className={styles.menuButton} onClick={() => handleMenuToggle(menu.id)}>
                                    <span>{menu.name}</span>
                                    <span className={styles.indicator}>{isMenuOpen ? '▲' : '▼'}</span>
                                </button>
                                
                                {isMenuOpen && (
                                    <ul>
                                        {menu.subMenus.map(subMenu => {
                                            const isSelected = selectedId === subMenu.id;
                                            return (
                                                <li key={subMenu.id}>
                                                    <button 
                                                        onClick={() => onSubMenuClick(subMenu.id)}
                                                        className={isSelected ? styles.selected : ''}
                                                    >
                                                        {subMenu.name}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}