import { useState } from 'react';

import styles from './MainPage.module.css';
import { Sidebar } from '../../components/Sidebar';
import { ItemList } from '../../components/ItemList';
import type { Item } from '../../types';

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedSubMenuId, setSelectedSubMenuId] = useState<number | null>(null);

export function MainPage() {
  const [selectedSubMenuId, setSelectedSubMenuId] = useState<number | null>(null);
  return (
    <div className={styles.mainpageLayout}>
      <Sidebar onSubMenuClick={setSelectedSubMenuId} selectedId={selectedSubMenuId} />

      <main className={styles.contentArea}>
        <header className={styles.header}>
          Componente 1 (Logout) e 3 (Arquivar)
        </header>
        <section className={styles.listSection}>
           <ItemList selectedId={selectedSubMenuId} />
        </section>
      </main>
    </div>
  );
}