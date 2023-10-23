'use client';

import { type Item } from '@src/server/db/schema';

import { FItem } from '../FItem';
import * as cls from './HomeGrid.css';

interface HomeGridProps {
    items: Omit<Item, 'dateAdded' | 'description' | 'userId'>[];
}

export const HomeGrid: React.FC<HomeGridProps> = ({
    items,
}) => {
    return (
        <div className={cls.base}>
            {items.map((item, i) => (
                <FItem
                    key={item.id}
                    item={item}
                    className={i % 3 === 0 ? cls.large : ''}
                />
            ))}
        </div>
    );
};
