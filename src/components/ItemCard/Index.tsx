import type { Item } from '../../types';
import styles from './itemCard.module.css';

import { useState } from 'react';

interface ItemCardProps {
    item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
    const [ismouseOnCard, setIsMouseOnCard] = useState(false);

    return (
        <div className={styles.cardContainer}
            onMouseEnter={() => setIsMouseOnCard(true)}
            onMouseLeave={() => setIsMouseOnCard(false)}>
            {ismouseOnCard ? (
                <input type="checkbox" className={styles.checkbox} />
            ) : (
                <div className={styles.ownerCircle}>
                    {item.owner}
                </div>
            )}

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