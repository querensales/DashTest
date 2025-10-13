import styles from './MainPage.module.css';
import { Sidebar } from '../../components/Sidebar';
import { useState } from 'react';

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
          Componente 4 (Lista)
        </section>
      </main>
    </div>
  );
}