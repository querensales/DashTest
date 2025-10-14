import type { Item } from '../../types';
import styles from './itemCard.module.css';

interface ItemCardProps {
    item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.ownerCircle}>
                {item.owner}
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
        </div>
    );
}