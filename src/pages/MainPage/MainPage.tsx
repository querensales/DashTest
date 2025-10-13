import styles from './MainPage.module.css';

export function MainPage() {
  return (
    <div className={styles.mainpageLayout}> 
      <aside className={styles.sidebar}>
        Componente 2 (Menu)
      </aside>
      
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