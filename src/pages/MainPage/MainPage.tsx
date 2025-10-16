import { useState, useEffect } from 'react';
import styles from './MainPage.module.css';
import { Sidebar } from '../../components/Sidebar';
import { ItemList } from '../../components/ItemList';
import { Header } from '../../components/Header';
import type { Item } from '../../types';

export function MainPage() {
  const [selectedSubMenuId, setSelectedSubMenuId] = useState<number | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!selectedSubMenuId) {
      setItems([]);
      return;
    }
    setSelectedItems([]);
    setLoading(true);
    fetch(`https://my-json-server.typicode.com/EnkiGroup/desafio-front-2025-2q/items/${selectedSubMenuId}`)
      .then(res => res.json())
      .then(responseObject => {
        setItems(responseObject.subMenuItems || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar os itens:", error);
        setLoading(false);
      });
  }, [selectedSubMenuId]);

  const handleSelectItem = (itemId: number) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter(id => id !== itemId);
      }
      return [...prevSelected, itemId];
    });
  };

  const handleArchiveItems = () => {
    const remainingItems = items.filter(item => !selectedItems.includes(item.id));
    setItems(remainingItems);
    setSelectedItems([]);
  };

  return (
    <div className={styles.mainpageLayout}>
      <Sidebar 
        onSubMenuClick={setSelectedSubMenuId} 
        selectedId={selectedSubMenuId}
        isOpen={isSidebarOpen}
      />
      {isSidebarOpen && <div className={styles.overlay} onClick={toggleSidebar} />}
      <main className={styles.contentArea}>
       <Header 
          selectedItemsCount={selectedItems.length}
          onArchive={handleArchiveItems}
          onMenuClick={toggleSidebar}
        />
        <section className={styles.listSection}>
          <ItemList
            loading={loading}
            items={items}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
          />
        </section>
      </main>
    </div>
  );
}