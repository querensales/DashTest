import type { Item } from '../../types';
import styles from './ItemCard.module.css';

interface ItemCardProps {
    item: Item;
    owner: string;
}

export default function ItemCard({ item }: { item: ItemCardProps }) {
    return (
        <section>
            <div className={styles.cardContainer}>
                <div className={styles.ownerCircle}>
                    {item.owner}
                </div>
            </div>
            <div className={styles.mainContent}>
                <span className={styles.name}>{item.name}</span>
                <p className={styles.subject}>{item.subject}</p>
            </div>

            <div className={styles.usersContainer}>
                {item.users.map((user, index) => (
                    <div key={index} className={styles.userCircle}>
                        {user}
                    </div>
                ))}
            </div>
        </section>
    )
}
