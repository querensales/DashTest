import { useState } from 'react';
import type { Item } from '../../types';
import styles from './ItemCard.module.css';

interface ItemCardProps {
    item: Item;
    isSelected: boolean;
    isSelectionMode: boolean;
    onSelect: (id: number) => void;
}

export function ItemCard({ item, isSelected, isSelectionMode, onSelect }: ItemCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const showCheckbox = isSelectionMode || isHovered;

    return (
        <div 
            className={styles.cardContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {showCheckbox ? (
                <input 
                    type="checkbox" 
                    className={styles.checkbox} 
                    checked={isSelected}
                    onChange={() => onSelect(item.id)}
                />
            ) : (
                <div className={styles.ownerCircle}>
                    {item.owner}
                </div>
            )}
            
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