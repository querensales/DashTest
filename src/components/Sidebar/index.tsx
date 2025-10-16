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
                const promotedItems: Menu[] = [];

                const originalMenusProcessed = data.map(menu => {
                    if (menu.name === 'Conta 3') {
                        const vipMenu = menu.subMenus.find(sm => sm.name === 'Vip');
                        const lixoMenu = menu.subMenus.find(sm => sm.name === 'Lixo');                   
                        if (vipMenu) promotedItems.push({ ...vipMenu, subMenus: [] });
                        if (lixoMenu) promotedItems.push({ ...lixoMenu, subMenus: [] });
                        return {
                            ...menu,
                            subMenus: menu.subMenus.filter(sm => sm.name !== 'Vip' && sm.name !== 'Lixo'),
                        };
                    }
                    return menu;
                });
                
                const finalMenuData = [...originalMenusProcessed, ...promotedItems];
                setMenus(finalMenuData);
                if (finalMenuData.length > 0) {
                    setOpenMenuId(finalMenuData[0].id);
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
        return <aside className={`${styles.sidebar} ${isOpen ? styles.isOpen : ''}`}>Carregando menus...</aside>;
    }
    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.isOpen : ''}`}>
            <nav>
                <ul>
                    {menus.map(menu => {
                        if (menu.subMenus.length === 0) {
                            const isSelected = selectedId === menu.id;
                            return (
                                <li key={menu.id}>
                                    <button
                                        onClick={() => onSubMenuClick(menu.id)}
                                        className={isSelected ? styles.selected : ''}
                                    >
                                        {menu.name}
                                    </button>
                                </li>
                            );
                        }                       
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